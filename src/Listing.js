const crypto = require('crypto');

class Listing {
    constructor(id, {item, count, seller}) {
        this.id     = id;
        this.item   = item;
        this.count  = count;
        this.seller = seller;
    }
}

class Listings {
    constructor(items, actors) {
        this.items  = items;
        this.actors = actors;

        this.data = {};
    }

    create({input}) {
        const id    = crypto.randomBytes(10).toString('hex');
        const item  = this.items .data[input.item];
        const actor = this.actors.data[input.seller];
        
        if (!item)
            throw new Error("Invalid key for Item");
        if (!actor)
            throw new Error("Invalid key for Seller");

        input.item   = item;
        input.seller = actor;
        input.id     = id;
        
        this.data[id] = input;

        return new Listing(id, input);
    }

    get({id}) {
        if (!this.data[id])
            throw new Error("Item not found");
        
        return new Listing(id, this.data[id]);
    }

    update({id, input}) {
        if (!this.data[id])
            throw new Error("Item not found");

            const item  = this.items .data[input.item];
            const actor = this.actors.data[input.seller];
    
            if (!item)
                throw new Error("Invalid key for Item");
            if (!actor)
                throw new Error("Invalid key for Seller");
    
            input.item   = item;
            input.seller = actor;
            
            this.data[id] = input;
    
        return new Listing(id, this.data[input]);
    }
}
module.exports = Listings;