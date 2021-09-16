const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS ENGINE
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

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