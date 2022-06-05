const crypto = require('crypto');

class Item {
    constructor(id, {name, desc}) {
        this.id    = id;
        this.name  = name;
        this.desc  = desc;
    }
}

class Items {
    constructor() {
        this.data = {};
    }

    create({input}) {
        const id = crypto.randomBytes(10).toString('hex');
        input.id = id;
        
        this.data[id] = input;

        return new Item(id, input);
    }

    get({id}) {
        if (!this.data[id])
            throw new Error("Item not found");
        
        return new Item(id, this.data[id]);
    }

    update({id, input}) {
        if (!this.data[id])
            throw new Error("Item not found");

        this.data[id] = input;

        return new Item(id, this.data[input]);
    }
};
module.exports = Items;