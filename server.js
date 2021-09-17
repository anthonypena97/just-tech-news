const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

// SESSIONS IMPLENETATION
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// HANDLEBARS ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// EXPRESS TO SERVE JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USING THE PUBLIC FOLDER TO SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// turn on conection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on ${PORT} `));
});