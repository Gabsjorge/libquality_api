const User = require("../models/User");
const Repository = require("../models/Repository");
const Search = require("../models/Search");

module.exports = {
    async index(req, res){
      const searches = await Search.findAll();

      return res.json(searches);
    },

    async store(req, res) {
        const { repo_id } = req.params;
        console.log(req.params);
        const { user_id, issues_count, issues_avg_time, issues_std_time } = req.body;
        let id_user = 0;

        const user = await User.findByPk(user_id);

        if (!user) {
          id_user = null;
        } else {
          id_user = user_id;
        }

        const repo = await Repository.findByPk(repo_id);

        if (!repo) {
            return res.status(400).json({
              error: 'Repository not Found'
            })
        }

        console.log(repo_id);
        const search = await Search.create({ 
          repo_id,
          user_id: id_user,
          issues_count: issues_count || null,
          issues_avg_time: issues_avg_time || null,
          issues_std_time: issues_std_time || null,
        });

        return res.json(search);
    },

    async delete(req, res) {
      const { id } = req.params;

      const search = await Search.destroy({
        where: {
          id
        }
      });

      return res.json(search);
    }
};
