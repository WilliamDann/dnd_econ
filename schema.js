const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Actor {
    id      : ID
    name    : String
    balance : Float
}

input ActorInput {
    name    : String
    balance : Float
}

type Item {
    id    : ID
    name  : String
    desc  : String
}

input ItemInput {
    name  : String
    desc  : String
}

type Listing {
    id     : ID

    item   : Item
    count  : Int
    
    seller : Actor
}

input ListingInput {
    item   : ID!
    count  : Int
    
    seller : ID!
}

type Query {
    getActor(id: ID!) : Actor
    getItem(id: ID!)  : Item

    getListing(id               : ID!) : Listing
    getListingsByItem(item_id   : ID!) : [Listing]
    getListingsByActor(actor_id : ID!) : [Listing]
}

type Mutation {
    createActor(input: ActorInput)          : Actor
    updateActor(id: ID!, input: ActorInput) : Actor

    createItem(input: ItemInput)         : Item
    updateItem(id: ID!, input:ItemInput) : Item

    createListing(input: ListingInput)          : Listing
    updateListing(id: ID!, input: ListingInput) : Listing
}
`);
