const express = require('express');
const cvRouter = require('./cv');
const authRouter = require('./auth');
const userRouter = require('./user');

const app = express();
/**USER PART**/
app.use('/auth', authRouter);
app.use('/users', userRouter);

/**CV PART**/
app.use('/cv', cvRouter);

module.exports = app;
