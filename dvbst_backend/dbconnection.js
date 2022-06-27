const mongoose = require("mongoose");
const logger = require("./helpers/logger");
// mongoose.connect('mongodb+srv://dannybo:chelsea123%23@sqat-cluster.rakex.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,

// }).then(db => console.log('connection established successfully'))
// mongoose.connect('mongodb+srv://kalmad99:chelsea123%23@sqat-cluster.rakex.mongodb.net/?retryWrites=true&w=majority',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,

// }).then(db => console.log('connection established successfully'))
mongoose
  .connect("mongodb://localhost:27017/dvsbt_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("connection established successfully"));
logger.info("Server connected to DB Successfuly");