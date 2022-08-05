const mysql = require("mysql2")
// create the connection to database
function connect(){
    const  pool  =  mysql . createPool ( { 
        host : 'localhost' , 
        user : 'root' , 
        database : 'luyenthilaixe' , 
        waitForConnections : true , 
        connectionLimit : 10 , 
        queueLimit : 0 
      } ) ;
    return pool.promise()
}
module.exports = connect()
