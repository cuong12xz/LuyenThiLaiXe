const a1Router = require("./a1Router")
const user = require("./user")

module.exports=(app)=> {
    
    app.use("/a1",a1Router);
    app.use("/user", user)
    
}