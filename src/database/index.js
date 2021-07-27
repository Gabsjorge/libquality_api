const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Repository = require("../models/Repository");
const Search = require("../models/Search");

const connection = new Sequelize(dbConfig);

User.init(connection);
Repository.init(connection);
Search.init(connection);

module.exports = connection;
