console.log('Dahsboard controller');
var mongoose = require('mongoose');
// var User = mongoose.model('User');


//just a placehold till i figure out how react client side is going to look
test_json = {
            fisrt: "one",
            second: "two"
            }

class Dashboard {
    

    index(req,res){
        res.json(test_json)
    }
}

module.exports = new Dashboard