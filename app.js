require('dotenv').config();
const express = require('express'),
  Liquid = require('liquidjs'),
  engine = Liquid(),
  moment = require('moment'),
  session = require('express-session'),
  sessionStore = require('connect-mongo')(session),
  path = require('path'),
  flash = require('flash'),
  compression = require('compression'),
  favicon = require('serve-favicon'),
  config = require('./config/development'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

  // Libs
  mongoose.connect(config.MONGO_DB.URI, function (err) {
    if (err) {
      console.log(err);
      return process.exit(0);
    }

    engine.registerFilter('remove', function (v, args) {
      let arr = [],
        arg_arr = args.split(',');

      //remove
      for (let _arg of arg_arr) {
        for (let k in v) {
          if (k == _arg)  delete v[k];
        }
      }

      //build http query
      for (k in v) {
        arr.push([k, '=', v[k]]).join('');
      }

      return arr.join('&');
    });

    engine.registerFilter('sum', function (v) {
      if (!v) return 0;
      return v.reduce(function (a, b) {
        return a + b;
      }, 0);
    });

    engine.registerFilter('format', function (v) {
      if (!v) {
        return 0;
      }
      return v.toLocaleString();
    });

    //config

    const app = express();
    app.listen(process.env.PORT || 3000);

    //middlewavers
    // const sess = {
    //   secret: 's1asfas53qedw',
    //   maxAge: 3600000 * 24 * 365,
    //   store: new sessionStore({
    //     db: DBO(),
    //     ttl: 3600000 * 24 * 365,
    //   }),
    //   resave: false,
    //   saveUninitialized: false
    // }
    //app.use(session(sess));

    app.engine('liquid', engine.express());
    app.set('view engine', 'liquid');
    app.set('view engine', 'liquid');
    app.set('views', __dirname + '/public');
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    app.use(flash());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
   //app.use(acl());

    // Routes
    //require('./app/controllers/admin/index.js')(app);
    //require('./app/controllers/user/index.js')(app);

    // No matching route
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      // todo: log err.message
      console.log(err.message);
      res.end();
      //res.render('error');
    });

  });


