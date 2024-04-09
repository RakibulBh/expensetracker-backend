const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const expenseRoutes = require('./routes/expenseRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' https://www.slant.co fonts.googleapis.com data:; style-src 'self' 'unsafe-inline' fonts.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval';");
    next();
});

/* Routes */

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/expenses', expenseRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"));

app.listen(process.env.PORT, () => {
    console.log("Listening on port 3001!")
})