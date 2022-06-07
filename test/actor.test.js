const assert          = require('assert');
const actor_func_defs = require('../src/actor');
const db              = { actors: {}, markets: {} };
const actor_funcs     = actor_func_defs(db);

describe('Actor', () => {
    describe('insertActor', () => {
        it('should insert the specified actor', () => {
            const payload = {
                name      : "Test Trader",
                inventory : []
            }
            const returned = actor_funcs.insertActor({actor:payload});

            assert.equal(db.actors[returned.id].name, payload.name);
            assert.equal(db.actors[returned.id].inventory.length, payload.inventory.length);
        });
    });

    describe('getActor', () => {
        it('should get the specified actor', () => {
            const payload = {
                name      : "Test Trader",
                inventory : []
            }
            const id       = actor_funcs.insertActor({actor:payload}).id;
            const returned = actor_funcs.getActor({id:id});

            assert.equal(returned.name, payload.name);
            assert.equal(returned.inventory.length, payload.inventory.length);
        });
    });

    describe('giveitem', () => {
        it('should give the item to the actor if it does not exist', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [] }}).id;
            actor_funcs.giveItem({actor_id:id, item:{ name: "Test Item", desc: "The Test Item", stack: 1 } });

            assert.equal(db.actors[id].inventory[0].name, "Test Item");
        });

        it ('should increase the stack size if the item already exists', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [ {name: "Test Item", stack: 10} ] }}).id;
            actor_funcs.giveItem({actor_id:id, item:{ name: "Test Item", stack: 10 } });

            assert.equal(db.actors[id].inventory[0].stack, 20);
        });

        it ('should fail for negative gives', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [] }}).id;
            
            assert.throws(
                () => actor_funcs.giveItem({actor_id:id, item:{ name: "Test Item", stack: -10 } }),
                Error
            );
        });
    });

    describe('takeItem', () => {
        it('should take the item from the actor inventory', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [] }}).id;
            actor_funcs.giveItem({actor_id:id, item:{ name: "Test Item", desc: "The Test Item", stack: 10 } });
            actor_funcs.takeItem({actor_id:id, item:{ name: "Test Item", desc: "The Test Item", stack: 10 } });

            assert.equal(db.actors[id].inventory.length, 0);
        });

        it ('should decrease the stack size if the item already exists', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [ {name: "Test Item", stack: 10} ] }}).id;
            actor_funcs.takeItem({actor_id:id, item:{ name: "Test Item", stack: 5 } });

            assert.equal(db.actors[id].inventory[0].stack, 5);
        });

        it ('should fail if the user does not have enough of the item', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [] }}).id;
            
            assert.throws(
                () => actor_funcs.takeItem({actor_id:id, item:{ name: "Test Item", stack: 10 } }),
                Error
            );
        });

        it ('should fail for negative takes', () => {
            const id = actor_funcs.insertActor({actor:{ name: "Test Trader", inventory: [] }}).id;
            
            assert.throws(
                () => actor_funcs.takeItem({actor_id:id, item:{ name: "Test Item", stack: -10 } }),
                Error
            );
        });
    });
})