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

### Architecture
Insert image of architecture here.

## Prerequisites <a name = "prerequesites"></a>

You should have [Node](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/) installed onto your machine.

If you already have Node and NPM, you can check their respective versions into your command prompt / terminal.

```
node --version

npm --version
```
There is an alternative to npm available (which I personally use), that is [Yarn](https://yarnpkg.com/getting-started/install).

Before proceding to the next section, configure the `.env` file located inside the environment folder, for the desired environment. The `.env.sample` file shows all the necessary variables that need to be filled.

## Installation <a name = "installation"></a>
To run the application inside your computer, do the following steps.

Open a terminal inside the project's folder, and run the following command:

```
npm install

// or

yarn install
```

## Usage <a name = "usage"></a>
To run the development application, do the following command:

```
npm run dev

// or

yarn dev
```

For API references, check this [Swagger](insert Swagger link).

## Running Tests <a name = "running_tests"></a>
To run tests for this project, do the following commands:

```
npm run test

// or

yarn test
```

Check all the tests that were run and their respective results into the console.

## Deployment <a name = "deployment"></a>
To deploy this project more easily, you should have [Docker](https://www.docker.com/get-started) installed and configured onto the desired machine.

Build the Docker image using the Dockerfile file in this repository, like this:

```
docker build -t <image name> .
```

*Please note that the dot (.) in the end is mandatory to build the Docker image.*

To run the container, do the following commmand:

```
docker run -p 3333:3333 <image name> service postgres start
```

## Contributing <a name = "contributing"></a>
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License <a name = "license"></a>
[MIT](https://choosealicense.com/licenses/mit/)