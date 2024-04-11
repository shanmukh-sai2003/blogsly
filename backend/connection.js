const mongoose = require('mongoose');
require('dotenv').config();

const mongoDbUri = `mongodb+srv://shanmukh:${process.env.DB_PWD}@atlascluster.xvry0av.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=AtlasCluster`

async function makeConnection() {
    try {
        await mongoose.connect(mongoDbUri);
        console.log("connection with database estabhlised");
    } catch (error) {
        console.log("database connection failed");
        console.log(error);
    }
}

module.exports = makeConnection;