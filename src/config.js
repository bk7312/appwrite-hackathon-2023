
// workaround for env not working
const process = {
    env: {
        REACT_APP_ENDPOINT:'https://cloud.appwrite.io/v1',
        REACT_APP_PROJECT_ID:'646ad7e4167a46151411',
        REACT_APP_COLLECTION_ID:'646d7bce583874b898e8',
        REACT_APP_DATABASE_ID:'646d77ba120f10283ceb',
    }
}

export const Server = {
    endpoint : process.env.REACT_APP_ENDPOINT,
    project: process.env.REACT_APP_PROJECT_ID,
    collectionID : process.env.REACT_APP_COLLECTION_ID,
    databaseID : process.env.REACT_APP_DATABASE_ID,
}
