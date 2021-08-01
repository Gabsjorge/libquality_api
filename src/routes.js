const express = require("express");
const UserController = require("./controllers/UserController");
const RepositoryController = require("./controllers/RepositoryController");

const GitHubController = require("./controllers/GitHubController");

const routes = express.Router();

// Database routes
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

// API routes
routes.get('/:owner/:repo/issues/count', GitHubController.getIssuesCount);
routes.get('/:owner/:repo/issues/:totalIssues/time', GitHubController.getIssuesOpenTime);

module.exports = routes;