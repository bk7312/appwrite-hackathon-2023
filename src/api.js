import { Client, Account, ID } from 'appwrite'
import { Server } from './config'

const client = new Client()

client.setEndpoint(Server.endpoint).setProject(Server.project)

const account = new Account(client)
// const database = new Database(client)

function loginUser({email, password}) {
    return account.createEmailSession(email, password)
}

function checkUser() {
    // checks if user logged in or not
    return account.get()
}

function createUser({email, password}) {
    return account.create(
        ID.unique(),
        email,
        password,
    )
}

function logoutUser() {
    return account.deleteSessions('current')
}

export { loginUser, createUser, checkUser, logoutUser }