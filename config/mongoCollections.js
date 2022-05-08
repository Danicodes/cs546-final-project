/*Borrowed from lecture code*/
const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

const dropCollectionFn = (collection) => {

  return async () => {
      const db = await dbConnection.connectToDb();
      await db.collection(collection).drop(function(err, deleteMessage) {
        if (err) {
          console.log(`Could not drop ${collection}`);
        }
        if (deleteMessage){
          console.log(`Successfully deleted ${collection}`);
        }
      });
      // dbConnection.closeConnection();
  }

}

module.exports = {
    // Add collections here as needed
    users: getCollectionFn('users')
    , relationships: getCollectionFn('relationships')
    , posts: getCollectionFn('posts')
    , chats: getCollectionFn('chats')

    , dropUsers: dropCollectionFn('users')
    , dropRelationships: dropCollectionFn('relationships')
    , dropPosts: dropCollectionFn('posts')
    , dropChats: dropCollectionFn('chats')
};
