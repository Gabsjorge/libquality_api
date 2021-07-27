const { Model, DataTypes } = require("sequelize");

class Search extends Model {
    static init(connection) {
        super.init({}, {
            sequelize: connection
        });
    }
}

module.exports = Search;