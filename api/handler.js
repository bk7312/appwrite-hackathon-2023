import { Client, ID, Databases, Permission, Role } from 'node-appwrite'

const client = new Client()
const databases = new Databases(client)

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('646ad7e4167a46151411') // Your project ID
    .setKey(process.env.COL_KEY) // Your secret API key


// create collection, give user read/create permission, add user/post attribute to collection
// const promise = databases.getCollection('[DATABASE_ID]', '[COLLECTION_ID]');

// const promise = databases.createCollection('[DATABASE_ID]', '[COLLECTION_ID]', '[NAME]');

// const promise = databases.createStringAttribute('[DATABASE_ID]', '[COLLECTION_ID]', 'user', 50, true);
// const promise = databases.createStringAttribute('[DATABASE_ID]', '[COLLECTION_ID]', 'post', 9999, true);

// body: request.body,
// query: request.query,
// cookies: request.cookies,

export default async function handler(request, response) {
  console.log(request)
  try {
    // const res = await databases.createCollection(
    //   '646d77ba120f10283ceb', 
    //   ID.unique(), 
    //   'request.body.title',
    //   [
    //     Permission.read(Role.user()),
    //     Permission.create(Role.user()),
    //   ]
    // )
    response.status(200).json({
      body: 123
    })
  } catch (error) {
    console.log(error)
    response.status(500).json("Something went wrong...")
  }
}