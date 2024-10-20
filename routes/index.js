const express = require('express');
const cvRouter = require('./cv');
const authRouter = require('./auth');
const userRouter = require('./user');
const eduRouter = require('./education');
const professionsRouter = require('./professional');
const reviewRouter = require('./review');

const app = express();
/**USER PART**/
app.use('/auth', authRouter);
app.use('/users', userRouter);

/**CV PART**/
app.use('/cv', cvRouter);

// Education
app.use('/cv/education', eduRouter);

// Profession
app.use('/cv/profession', professionsRouter);

//Review
app.use('/cv/review', reviewRouter);

module.exports = app;
