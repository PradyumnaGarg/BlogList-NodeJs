const mongoose = require('mongoose');
const config = require('./utils/config');

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => console.log('connected to db'))
.catch((error) => console.error(error));