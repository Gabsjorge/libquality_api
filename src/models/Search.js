const { Model, DataTypes } = require("sequelize");

class Search extends Model {
    static init(connection) {
        super.init({
            issues_count: DataTypes.INTEGER,
            issues_avg_time: DataTypes.FLOAT,
            issues_std_time: DataTypes.FLOAT,
        }, {
            sequelize: connection
        });
    }

    static associate (models) {
      this.belongsTo(models.Repository, { foreignKey: 'repo_id', as: 'repo_search' });
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user_search' });
    }
}

module.exports = Search;