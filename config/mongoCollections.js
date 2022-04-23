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

module.exports = {
    // Add collections here as needed
    users: getCollectionFn('users'),
	  chats: getCollectionFn('chats'),
	  relationships: getCollectionFn('relationships')
};
