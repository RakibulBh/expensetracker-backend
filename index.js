const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath} = require('url');

const expenseRoutes = require('./routes/expenseRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');


/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors({
origin: ['https://expensetracker-frontend-eosin.vercel.app'],
        credentials: true
}));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


/* Routes */

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/expenses', expenseRoutes)


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"));

app.listen(process.env.PORT, () => {
    console.log("Listening on port 3001!")
})