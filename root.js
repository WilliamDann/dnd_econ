const Actors   = require('./src/Actor');
const Items    = require('./src/Item');
const Listings = require('./src/Listing');

const actors   = new Actors();
const items    = new Items();
const listings = new Listings(items, actors);

module.exports = {
    getActor    : (id)    => actors.get(id),
    createActor : (input) => actors.create(input),
    updateActor : (input) => actors.update(input),

    getItem     : (id)    => items.get(id),
    createItem  : (input) => items.create(input),
    updateItem  : (input) => items.update(input),

    getListing    : (id)    => listings.get(id),
    createListing : (input) => listings.create(input),
    updateListing : (input) => listings.update(input),

    getListingsByItem  : (id) => Object.values(listings.data).filter((x) => x.item.id   == id),
    getListingsByActor : (id) => Object.values(listings.data).filter((x) => x.seller.id == id),
}