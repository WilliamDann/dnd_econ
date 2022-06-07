const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Actor {
    id: ID
    name      : String
    inventory : [Item]
}

type Item {
    name  : String
    desc  : String
    stack : Int
}


type Market {
    id       : ID
    name     : String!
}

type Listing {
    id        : ID

    give      : Item
    take      : Item

    lister_id : ID
    market_id : ID
}

input ActorInput {
    id        : String
    name      : String!
    inventory : [ItemInput]!
}

input ItemInput {
    name  : String
    desc  : String
    stack : Int
}

input MarketInput {
    name: String!
}

input ListingInput {
    give      : ItemInput
    take      : ItemInput
    lister_id : ID
    market_id : ID
}

type Mutation {
    insertActor(actor: ActorInput)    : Actor
    insertMarket(market: MarketInput) : Market

    giveItem(actor_id: ID, item: ItemInput): [Item]
    takeitem(actor_id: ID, item: ItemInput): Item

    insertListing(listing: ListingInput)      : Listing
    removeListing(id: ID)                     : Listing
    completeListing(listing_id: ID, completer_id: ID) : Listing
}

type Query {
    getActor(id: ID)   : Actor
    getMarket(id: ID)  : Market
    getListing(id: ID) : Listing
    
    getMarkets: [Market]
}
`);
