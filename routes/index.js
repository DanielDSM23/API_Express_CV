const express = require('express');
const cvRouter = require('./cv');
const authRouter = require('./auth');
const userRouter = require('./user');
const eduRouter = require('./education');

const app = express();
/**USER PART**/
app.use('/auth', authRouter);
app.use('/users', userRouter);

/**CV PART**/
app.use('/cv', cvRouter);

// Education
app.use('/cv/:cvId/educations', eduRouter);

module.exports = app;
