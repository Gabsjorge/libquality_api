# LibQuality API

## Table of Contents
+ [About](#about)
+ [Prerequisites](#prerequesites)
+ [Installation](#installation)
+ [Usage](#usage)
+ [Running Tests](#running_tests)
+ [Deployment](#deployment)
+ [Contributing](#contributing)
+ [License](#license)

## About <a name = "about"></a>
The objective of this project is to showcase an API, that consumes the [GitHub REST API](https://docs.github.com/en/rest) and produces data to populate an imaginary website. This website shows information related to open issues and its average life time before resolution.

### Techs

- NodeJS: The JavaScript runtime most beloved by the JavaScript community. I didn't choose this, the only requirement for this project was to use NodeJS.
- PostgreSQL: One of the best relational databases available in the market, completely open source. Has a ton of functionalities, and I chose it because I already work with it in my job.
- Express: NodeJS framework that is fast, minimalistic, and easy to use. I chose this one because is the framework I mostly use nowadays for API development.
- Jest: A super famous testing library for NodeJS and Typescript, I chose this one because the community is big, and the documentation is large and complete.
- Sequelize: A promise based ORM, also super famous for NodeJS application development. Offers a lot of tools for migrations and database related manipulations. I chose this one because it is well documented and has a big community, like Jest.

### Architecture

![Architecture](/images/Architecture.png)

### Database

![Database](/images/Database.png)

## Prerequisites <a name = "prerequesites"></a>

You should have [Node](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/) installed onto your machine.

If you already have Node and NPM, you can check their respective versions into your command prompt / terminal.

```
node --version

npm --version
```
There is an alternative to npm available (which I personally use), that is [Yarn](https://yarnpkg.com/getting-started/install).

Before proceding to the next section, configure the `.env` file located inside the environment folder, for the desired environment. The `.env.sample` file shows all the necessary variables that need to be filled. One of the needed infos is a Github personal access token, for more information in how to create one, use this [link](https://docs.github.com/pt/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).

## Installation <a name = "installation"></a>
To run the application inside your computer, do the following steps.

Open a terminal inside the project's folder, and run the following command:

```
npm install

// or

yarn install
```

## Usage <a name = "usage"></a>
First, you need to get a PostgreSQL service up, to serve as the database. Do the command below:

```
docker-compose up -d
```

Then, you need to initialize the migration of the database, with the following command:

```
sequelize db:migrate

// or

yarn sequelize db:migrate
```

To run the development application, do the following command:

```
npm run dev

// or

yarn dev
```

For API references, check this [Swagger](https://app.swaggerhub.com/apis-docs/Gabsjorge/LibQualityAPI/1.0.0-oas3).

## Running Tests <a name = "running_tests"></a>
To run tests for this project, make sure you start the development application, and then do the following commands:

```
npm run test

// or

yarn test
```

Check all the tests that were run and their respective results into the console.

## Deployment <a name = "deployment"></a>
To deploy this project more easily, you should have [Docker](https://www.docker.com/get-started) installed and configured onto the desired machine.

Build the Docker image using the Dockerfile file in this repository, located inside deploy folder, like this:

```
cd deploy

docker build -t <image name> .
```

*Please note that the dot (.) in the end is mandatory to build the Docker image.*

To run the container, do the following commmand:

```
docker run -p <desired port>:3333 <image name> -d service postgres start
```

## Contributing <a name = "contributing"></a>
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License <a name = "license"></a>
[MIT](https://choosealicense.com/licenses/mit/)