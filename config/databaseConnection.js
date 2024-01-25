const mongoose = require("mongoose");
const databaseConnection = () => {
    mongoose.connect(process.env.DB_URL)
    .then((response) => console.log(`database connected with ${response.connection.host}`))
    .catch((err) => err.message);
}
module.exports = databaseConnection;