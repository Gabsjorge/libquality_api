const express = require("express");
const routes = require("./routes");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, 'src', 'environments', `.env.${process.env.NODE_ENV}`) });
require("./database");

const port = process.env.PORT || 3333;

const app = express();

// Enables requests from Express to interpret JSON responses, and uses routes from routes file
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
