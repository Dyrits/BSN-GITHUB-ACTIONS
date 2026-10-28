# BSN-GITHUB-ACTIONS

## About The Project

A full-stack refresher project: a book social network with a Spring Boot back end (book-network) and an Angular front end (book-network-ui). Per the repository description, it focuses on implementing a continuous integration pipeline using GitHub Actions (workflows in .github/workflows). Docker Compose runs the local PostgreSQL database and a MailDev mail server.

### Built With

- Spring Boot 3.2
- Angular 16
- PostgreSQL and MailDev (Docker Compose)
- GitHub Actions

## Getting Started

### Prerequisites

- Docker and Docker Compose
- A Java JDK and Maven (or the included Maven wrapper)
- Node.js and npm

### Running

Copy `.env.example` to `.env` and fill in the values, then start the supporting services:

```sh
docker compose up -d
```

Back end:

```sh
cd book-network
./mvnw spring-boot:run
```

Front end:

```sh
cd book-network-ui
npm install
npm start
```

## License

No license file is present in this repository.

## Contact

Dyrits - https://github.com/Dyrits
