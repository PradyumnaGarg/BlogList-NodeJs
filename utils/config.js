require('dotenv').config();

const MONGODB_URL = process.env.NODE_ENV === 'test'
                    ? process.env.MONGODB_TEST_URL
                    : process.env.MONGODB_URL;
const PORT = process.env.PORT || 3443;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    MONGODB_URL,
    PORT,
    JWT_SECRET
};
