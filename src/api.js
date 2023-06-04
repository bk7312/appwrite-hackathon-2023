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

function getDocList(col) {
    return database.listDocuments(Server.database, Server[col])
}

function createDoc(col, doc, data) {
    return database.createDocuments(Server.database, Server[col], doc, data)
}

function getDoc(col, doc) {
    return database.getDocument(Server.database, Server[col], doc)
}

function updateDoc(col, doc, data) {
    return database.updateDocuments(Server.database, Server[col], doc, data)
}

// probably refactor, return user/database object instead of individual functions

export { 
    createUser, 
    loginUser, 
    logoutUser,
    checkUser,
    updateEmail,
    updatePassword,
    getDocList,
    createDoc,
    getDoc,
    updateDoc,
}