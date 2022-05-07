const mongoCollections = require('../config/mongoCollections');
const getFiltersCollection = mongoCollections.filters;

// A collection that will allow users to add filters to their posts -- those filters will end up in search tags
// Anywhere that was previously relying on categories should now rely on filters (provided this will work correctly)

async function addNewFilter(filter){
    
}

async function filterExists(filter){

}

module.exports = {
    addNewFilter,
    filterExists
}