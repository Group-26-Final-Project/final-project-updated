const app = require('./app')
require('./dbconnection');

async function init(){
    await app.listen(8080);
    console.log('Server on Localhost:8080')
}

init();