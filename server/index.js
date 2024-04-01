const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');
const { PORT, MONGODB_URI } = require('./config/env');
const swagger = require('./swagger');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');


const app = express();
swagger(app);

app.use(express.json());
app.use(cors());
app.use('/', bookRoutes);
app.use('/', reviewRoutes);
app.use('/', userRoutes);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${MONGODB_URI}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });
