const app = require('./app')
require('./dbconnection');
const initMoralis = require('./helpers/initMoralis');

async function init(){
    await app.listen(process.env.PORT || 8080)
    await initMoralis();
    console.log('Server on Localhost:8080')
}

init();