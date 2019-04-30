# Boba Watch Backend
This is the backend for the webiste https://boba.watch!

## Setup
Before starting the server, you need to install all of our dependencies:
```
npm install
```

To start the dev server, you first need to get access to our database. Currently, the dev environment uses the prod database. In order to access it you need to follow the instructions [here](https://cloud.google.com/sql/docs/mysql/quickstart-proxy-test). Afterwards, copy the `./cloud_sql_proxy` to `/user/local/bin`. Finally, run this to setup the proxy:
```
make proxysql
```

Once the proxy to the SQL server is setup, run this to start the dev server:
```
make dev
```

To start the prod server, run:
```
make prod
```

## Frontend
Check out the associated frontend to this app [here](https://github.com/Ryabn/boba-watch)!
