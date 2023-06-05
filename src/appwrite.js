import { Client, Account, ID, Databases } from 'appwrite'
import { Server } from './config'

const client = new Client()

client.setEndpoint(Server.endpoint).setProject(Server.project)

const account = new Account(client)
const database = new Databases(client)

function createUser({email, password}) {
    return account.create(
        ID.unique(),
        email,
        password,
    )
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

// async function getMap(){
//     const data = await database.listDocuments(Server.database, Server.mapCol)
//     const map = {}
//     data.documents.forEach(doc => {
//         map[doc.link] = {
//             list: doc.listID,
//             post: doc.postID,
//         }
//     })
//     console.log("async", map)
//     return map
// }
// const map = getMap()
// console.log("outside", map)

function getThreads(col) {
    return database.listDocuments(Server.database, Server[col].list)
}

function createThread(col, data) {
    return database.createDocument(Server.database, Server[col].list, ID.unique(), data)
}

function getPosts(col, doc) {
    return database.getDocument(Server.database, Server[col].post, doc)
}

function replyPost(col, doc, data) {
    return database.createDocument(Server.database, Server[col].post, doc, data)
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
    getThreads,
    createThread,
    getPosts,
    replyPost,
}