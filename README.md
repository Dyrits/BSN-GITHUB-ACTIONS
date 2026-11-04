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

## UI dependency migration verification (November 2026)

The UI uses a coherent Angular 21 framework/compiler/CLI/build stack, TypeScript 5.9 and Zone.js 0.16, tested on Node.js 26.13.0 LTS. Existing NgModule declarations are explicitly non-standalone. Versioned Angular 17-20 core and 17-21 CLI migration collections were checked and applied where relevant, including HTTP provider/interceptor registration, workspace options, bootstrap providers and template control flow. The optional application-builder conversion was not applied; the existing browser builder remains.

Clean npm ci and production build pass. All 19 ChromeHeadless tests pass. Local Chromium checks cover login/register navigation, activation form rendering and the lazy-loaded Books page using a local token and empty API fixture. No actual login, email activation, book mutation or backend integration was tested. The 430px empty Books view is readable. The initial build grows from 656.67 kB to approximately 792 kB, exceeding the existing 500 kB warning budget but remaining below the unchanged 1 MB error budget. Existing optional-chain warnings remain.

The UI npm audit drops from 92 to 27 package findings, critical 6 to 0 and high 50 to 0. Distinct advisory IDs fall from 229 to 3, with no new IDs: residual Glob, Minimatch and UUID findings remain. This is not an all-clear. Backend dependencies, Docker images and deployment behavior are not covered by this UI verification. Existing image-push workflows target ci/develop, not main, and were not invoked.

Migration sources: https://angular.dev/reference/releases and https://blog.angular.dev/the-future-is-standalone-475d7edbc706 .
