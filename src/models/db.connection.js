// const mysql = require('mysql2/promise');

// const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST || 'db',
//   port: process.env.MYSQL_PORT || 3306,
//   user: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || 'password',
//   database: 'StoreManager',
// });

const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/StoreManager';

// const options = {
//   user: 'root', 
//   pass: 'password', 
//   dbName: 'StoreManager', 
// };

module.exports = mongoose.connect(MONGO_DB_URI);

// module.exports = connection;