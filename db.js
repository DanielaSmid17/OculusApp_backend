const { MongoClient, ObjectId } = require("mongodb");
let users_collection = "";

function initializeDB() {
    const db_conn_string = process.env.DB_CONN_STRING;
    const client = new MongoClient(db_conn_string, { useUnifiedTopology: true });

    client.connect().then((response) => {
        if (response.topology.s.state) {
            console.log("Status: " + response.topology.s.state);
            const db = client.db("OculusDB");
            users_collection = db.collection("users");
        } else {
            console.log("Problem connecting to MongoDB");
        }
    });
}
function users() {
    return users_collection;
}

exports.initializeDB = initializeDB;
exports.users = users;
exports.ObjectId = ObjectId;