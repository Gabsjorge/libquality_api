const express = require("express");

const UserController = require("./controllers/UserController");
const RepositoryController = require("./controllers/RepositoryController");
const SearchController = require("./controllers/SearchController");

const GitHubController = require("./controllers/GitHubController");

const routes = express.Router();

// Database routes
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/repositories/:name/:owner', RepositoryController.getByNameAndOwner);
routes.post('/repositories', RepositoryController.store);
routes.delete('/repositories', RepositoryController.delete);

routes.get('/searches', SearchController.index);
routes.post('/repositories/:repo_id/searches', SearchController.store);
routes.delete('/searches/:id', SearchController.delete);

// API routes
routes.get('/:owner/:repo/issues/count', GitHubController.getIssuesCount);
routes.get('/:owner/:repo/issues/:totalIssues/time', GitHubController.getIssuesOpenTime);

module.exports = routes;