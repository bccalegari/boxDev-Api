# boxDev-Api

File Management RESTful API built with NodeJS, Express, Sequelize, MySQL and integrated with Cloudflare, that is used for uploading and downloading images, music and videos.

## About this Project

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project!

Email me: brunocostacallegari@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/bruno-da-costa-calegari/)

Also, you can use this project as you wish, be for study, be for make improvements or anything!

## Getting Started

### Prerequisites

To run this project you'll need to have an cloudflare account, docker installed and the environment setted up.

### Installing

#### Cloning the Repository

```

$ git clone https://github.com/bccalegari/boxDev-Api

$ cd boxDev-Api

```

### Setting up the environment

Copy the file `.env.sample` and make sure to configure all ports correctly, especially the database and test database ports, and the cloudflare variables.

### Running

```

$ docker compose up

```

## Routes

Access the swagger documentation on http://localhost:8080/api-docs/ to see all available routes.

## Tests

With docker running, run:

```

$ docker ps

```

Get the node app container id and run:

```

$ docker exec -it <CONTAINER_ID> sh

```

Then run one of the test scripts in `package.json`, example:

```

$ npm run tests

```

## Built With

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Multer](https://github.com/expressjs/multer)
- [Dotenv](https://github.com/motdotla/dotenv)
- [MySQL](https://www.mysql.com/)
- [Sequelize](https://sequelize.org/)

## Support Tools

- [Docker](https://www.docker.com/)
- [Log4js](https://github.com/log4js-node/log4js-node)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Cloudflare](https://www.cloudflare.com/developer-platform/r2/)

## Contributing

You can send how many PR's do you want, I'll be glad to analyze and accept them! And if you have any question about the project:

Email me: brunocostacallegari@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/bruno-da-costa-calegari/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bccalegari/boxDev-Api/blob/main/LICENSE.md) file for details.
