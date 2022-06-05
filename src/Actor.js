const crypto = require('crypto');

class Actor {
    constructor(id, {name, balance}) {
        this.id      = id;
        this.name    = name; 
        this.balance = balance;
    }
};

class Actors {
    constructor() {
        this.data = {};
    }

    create({input}) {
        const id = crypto.randomBytes(10).toString('hex');
        input.id = id;

        this.data[id] = input;

        return new Actor(id, input);
    }

    get({id}) {
        if (!this.data[id])
            throw new Error("Actor not found");

        return new Actor(id, this.data[id]);
    }
}
module.exports = Actors;