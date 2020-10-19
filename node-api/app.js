const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI).then(() => (console.log('DB Connected')));

mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

// middleware 
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node js API is listening on port: ${port}`);
});