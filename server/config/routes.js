// console.log('routes');

let dashboard = require("./../controllers/dashboard")

module.exports = function(app) {
    //dashboard routes  Only needs login
    app.get('/', dashboard.index)
  

}