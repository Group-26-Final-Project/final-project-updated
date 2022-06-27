const app = require('./app')
require('./dbconnection');
const initMoralis = require('./helpers/initMoralis');
const logger = require('./helpers/logger');

async function init(){
    await app.listen(process.env.PORT || 8080)
    await initMoralis();
    console.log('Server on Localhost:8080')
    logger.info("Server Started Successfuly");
}

init();