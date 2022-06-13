const crypto = require('crypto');

module.exports = data => { return {
    insertActor: ({actor}) => {
        if (!actor.id)
            actor.id = crypto.randomBytes(20).toString('hex');

        data.actors[actor.id] = actor;

        return actor;
    },

    getActor: ({id}) => {
        return data.actors[id];
    },

    getActors: () => {
        return Object.values(data.actors)
    },

    giveItem: ({actor_id, item}) => {
        const actor = data.actors[actor_id];
        if (item.stack < 0)
            throw new Error(`item.stack was less than 0 (${item.stack}). Please use takeItem to remove items.`)
        if (!actor)
            throw new Error(`Actor ${actor_id} does not exist.`);

        for (let inv_item of actor.inventory)
            if (inv_item.name == item.name)
            {
                inv_item.stack += item.stack;
                return actor.inventory;
            }

        actor.inventory.push(item);
        return actor.inventory;
    },

    takeItem: ({actor_id, item}) => {
        const actor = data.actors[actor_id];
        if (item.stack < 0)
            throw new Error(`item.stack was less than 0 (${item.stack}). Please use giveItem to add items.`)
        if (!actor)
            throw new Error(`Actor ${actor_id} does not exist.`);

        for (let i = 0; i < actor.inventory.length; i++)
            if (actor.inventory[i].name == item.name)
                if (actor.inventory[i].stack - item.stack >= 0)
                {
                    actor.inventory[i].stack -= item.stack;
    
                    if (actor.inventory[i].stack == 0)
                        actor.inventory.splice(i, 1);
                        
                    return item;
                }

        throw new Error("The actor does not have enough of this item to give");
    }
}};