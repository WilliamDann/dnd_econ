module.exports = db => {
    const root = {};

    Object.assign(root, require('./src/actor')(db));
    Object.assign(root, require('./src/market')(db));
    Object.assign(root, require('./src/listing')(db));
    Object.assign(root, require('./src/itemTemplate')(db));
    
    return root;
}