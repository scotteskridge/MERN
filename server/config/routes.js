// console.log('routes');

let dashboard = require("./../controllers/dashboard")
let users = require("./../controllers/users")

module.exports = function(app) {
    //dashboard routes  Only needs login
    app.get('/', dashboard.index)
    app.get('/test', dashboard.test)
    app.get('/users', users.users)
  
  

}