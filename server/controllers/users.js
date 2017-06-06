console.log('User controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');


let users = [{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  },
  {
      id: 3,
      username: "shane"
  }
  ]

class Users {

     users(req,res){
        console.log("hit the user route inside the user controller")
        res.json(users)
    }
    

    login(req, res) {
        // console.log("the request.body is:",req.body)
            // res.json(true)
        User.findOne({ name: req.body.name })
            .then(data => {
                // console.log("did i try to find a user?", data)
                if (data) {
                    //if the user existed reply with the user
                    res.json(data)
                    
                } else {
                    let new_User = new User(req.body)
                    new_User.save()
                        .then(() => {
                            // console.log("and then the server sent a User", new_User)
                            res.json(new_User)
                        })
                        .catch(err => {
                            console.log("User server save error", err)
                        })
                }
            })
            .catch(err => {
                console.log("User server save error", err)
                res.status(500).json(err)
            })
    }



}

module.exports = new Users