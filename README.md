## Server part

Firstly, start the application without seeding.
Stop the application.
Install the packages listed below:

1) `npm i -g sqlite3`
2) `npm i -g sequelize-cli`

Then run `sequelize db:seed:all` which will seed universities.

The SQLite Db file will be placed into `db` directory.
For browsing DB data you can use DB Browser for SQLite.



## Client part

Inside `client` directory please perform `npm install`

Then run `npm run build`. This will build up client part.


## Run app
Run app by running `node server.js`

Open in your browser `http://localhost:9000`

Enjoy :)