// dotenv is used for maintaining the secret files
// npm i dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const databaseConnection = require('./config/databaseConnection');
const app = require('./app');
// db connection
databaseConnection();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});


