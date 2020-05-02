require('dotenv').config({
    path: `../.env.development.local`
});
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

const port = process.env.PORT || 4000;
const store = new MongoDBStore({
    uri: process.env.MONGO_DB_URL,
    collection: 'sessions'
});
store.on('error', error => {
    console.log(error);
});

mongoose.connect(process.env.MONGO_DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected');
});

//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors({
    'origin': process.env.SITE_URL,
    'methods': ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    'credentials': true
}));

app.use(express.json({limit: '10mb'}));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 86400000, //24 hours
        secure: process.env.NODE_ENV === 'production' ? true : false,
        httpOnly: true
    },
    name: 'userSession'
}));

app.use(passport.initialize());
app.use(passport.session());
require('./auth')(passport);

//user routes
app.use('/api/user', userRoutes);
//blog post routes
app.use('/api/blogs', blogRoutes);
//comment routes
app.use('/api/comment', commentRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Hey there!'
    });
});

app.listen(port, () => console.log(`Listening to port ${port}`));