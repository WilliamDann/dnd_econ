module.exports = db => { return {
    insertItemTemplate: ({item}) => {
        if (db.itemTemplates[item.name])
            throw new Error("Item already exists");

        db.itemTemplates[item.name] = item;
        return item;
    },

    getItemTemplate: ({name}) => {
        return db.itemTemplates[name];
    },

    getItemTemplates: () => {
        return Object.values(db.itemTemplates);
    }
}}