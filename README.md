# appointmentsBackend

express backend for appointments handling app

## Setup to run locally

create a .env file in the root with the following content or simular. You will
need either MongoDB runing via Docker or locally, or to setup a project on
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and copy the URI into the
environment variable.

You can find a [sample .env](docs/sample.env) file in the docs folder.

```sh
MONGODB="mongodb://localhost/appointments"
```

then run the following commands

```bash
npm install
npm run dev
```
