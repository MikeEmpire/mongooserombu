/**************************************/
//*****// Dependencies
/**************************************/

import express      from 'express';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import compression  from 'compression';
import passport     from './config/passport';
import config       from './config/extra-config';
import path         from 'path';
import session      from 'express-session';
import database     from './config/database';
import mongoose     from 'mongoose';
import handlebars   from 'express-handlebars';
import cors         from 'cors';

const logger        = require('morgan');

/**************************************/
//*****// Initalize Express & PORT
/**************************************/

const app = express();
const PORT = 3000;
let db;

/**************************************/
//*****// Initialize views and handlebars
/**************************************/

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', path.join( __dirname, '..', 'views'));
app.use(compression());


/**************************************/
//*****// Middleware
/**************************************/

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static('public'));
app.use(session({ secret: config.sessionKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/**************************************/
//*****// Mongoose Connection
/**************************************/

mongoose.Promise = global.Promise;

mongoose.connect(database.url, {
  useMongoClient: true,
  promiseLibrary: require('bluebird')
});

//Get the default connection
db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

/**************************************/
//*****// Express Routing
/**************************************/

require('./routes')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**************************************/
//*****// Initalize Port listen
/**************************************/

app.listen(process.env.PORT || PORT, () => {
  console.log(`You are listening to port ${PORT}`);
});
