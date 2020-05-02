require('dotenv').config({
    path: `./.env.development.local`
});

module.exports = {
    env: {
        API_URL: process.env.API_URL
    }
}