const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const UserRouter = require('./src/routues/UserRoutes');
const AuthRouter = require('./src/routues/AuthRoutes');
const TestRouter = require('./src/routues/TestRoutes');
const BlogRouter = require('./src/routues/BlogRoutes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/test', TestRouter);
app.use('/blog', BlogRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});

const dbConfig = require("./src/configs/db.configs.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbURL = dbConfig.url;

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});