import { Client, Account, ID, Databases, Query, Storage } from 'appwrite'
import { Server } from './config'

const client = new Client()

client.setEndpoint(Server.endpoint).setProject(Server.project)

const account = new Account(client)
const database = new Databases(client)
const storage = new Storage(client)

async function createUser({email, password, name}) {
    const checkName = await database.listDocuments(
        Server.database, 
        Server.user, 
        [Query.equal("name", name)]
    )
    if (checkName.total > 0) throw { message: "Your chosen user name is already in use, please choose a different one." }
    const user = await account.create(
        ID.unique(),
        email,
        password,
        name
    )
    await account.createEmailSession(email, password)
    return database.createDocument(Server.database, Server.user, user.$id, {name, id: user.$id})
}

function loginUser({email, password}) {
    return account.createEmailSession(email, password)
}

function logoutUser() {
    return account.deleteSessions('current')
}

function checkUser() {
    // checks if user logged in or not by getting user info
    return account.get()
}

function updateEmail(email, password) {
    return account.updateEmail(email, password)
}

function updatePassword(newPassword, oldPassword) {
    return account.updatePassword(newPassword, oldPassword)
}

async function getUserData(user) {
    const data = await database.listDocuments(Server.database, Server.user, [
        Query.equal("name", user)
    ])
    if (data.total !== 1) throw {error: "User not found"}
    let picID = data.documents[0].picID
    if (!picID) picID = Server.defaultPic
    const pic = storage.getFileView(Server.picBucket, picID)
    return {
        pic,
        user: data.documents[0]
    }
}

async function uploadPic(pic) {
    const user = await account.get()
    const userDoc = await database.listDocuments(Server.database, Server.user, [
        Query.equal("name", user.name)
    ])
    if (userDoc.documents[0].picID) {
        await storage.deleteFile(Server.picBucket, userDoc.documents[0].picID)
    }
    const data = await storage.createFile(Server.picBucket, ID.unique(), pic)
    return database.updateDocument(Server.database, Server.user, userDoc.documents[0].$id, {picID: data.$id})
}

async function updateBio(bio) {
    const user = await account.get()
    const userDoc = await database.listDocuments(Server.database, Server.user, [
        Query.equal("name", user.name)
    ])
    return database.updateDocument(Server.database, Server.user, userDoc.documents[0].$id, {bio})
}

function getMenu(link){
    if (!link) return database.listDocuments(Server.database, Server.mapCol)
    return database.listDocuments(Server.database, Server.mapCol, [
        Query.equal("link", link)
    ])
}

function getThreads(col) {
    return database.listDocuments(Server.database, Server[col].list)
}

async function createThread(col, obj) {
    const { name } = await account.get()
    obj.user = name
    return database.createDocument(Server.database, Server[col].list, ID.unique(), obj)
}

async function getPosts(col, doc) {
    const opening = await database.getDocument(
        Server.database, 
        Server[col].list, 
        doc
    )
    const replies = await database.listDocuments(
        Server.database, 
        Server[col].post, 
        [
            Query.equal("threadID", doc),
            Query.orderAsc("$createdAt")
        ]
    )
    const returnObj = {
        opening,
        replies
    }
    return returnObj
}

async function replyPost(col, obj) {
    const { name } = await account.get()
    obj.user = name
    return database.createDocument(Server.database, Server[col].post, ID.unique(), obj)
}

// probably refactor, return user/database object instead of individual functions
// change in db structure

export { 
    createUser, 
    loginUser, 
    logoutUser,
    checkUser,
    updateEmail,
    updatePassword,
    getUserData,
    uploadPic,
    updateBio,
    getMenu,
    getThreads,
    createThread,
    getPosts,
    replyPost,
}