const { Model, DataTypes } = require("sequelize");

class Repository extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            owner: DataTypes.STRING,
        }, {
            sequelize: connection
        });
    }

}

module.exports = Repository;