const Repository = require("../models/Repository");

module.exports = {
    async store(req, res) {
        const { name, owner, issues_count } = req.body;

        const repo = Repository.create({ name, owner, issues_count });

        return res.json(repo);
    }
};
