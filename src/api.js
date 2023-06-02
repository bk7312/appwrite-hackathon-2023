import { Client, Account, ID } from 'appwrite'
import { Server } from './config'

const client = new Client()

client.setEndpoint(Server.endpoint).setProject(Server.project)

const account = new Account(client)
// const database = new Database(client)

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
    // checks if user logged in or not
    return account.get()
}

function updateEmail(email, password) {
    return account.updateEmail(email, password)
}

function updatePassword(newPassword, oldPassword) {
    return account.updatePassword(newPassword, oldPassword)
}


export { 
    createUser, 
    loginUser, 
    logoutUser,
    checkUser,
    updateEmail,
    updatePassword,
}