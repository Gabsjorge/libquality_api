const Repository = require("../models/Repository");

module.exports = {
    async store(req, res) {
        const { name, owner } = req.body;

        const repo = await Repository.create({ name, owner });

        return res.json(repo);
    },

    async getByNameAndOwner(req, res) {
        const { name, owner } = req.params;

        const repo = await Repository.findOne({
          where: {
            name,
            owner
          }
        });

        if (!repo) {
            return res.json({
              result: false
            });

        } else {
            return res.json(repo);
        }
    },

    async delete(req, res) {
      const { id } = req.body;

      const repo = await Repository.destroy({
        where: {
          id
        }
      });

      return res.json(repo);
    }
};
