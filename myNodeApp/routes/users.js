var express = require('express');
var router = express.Router();

users=[
  {id:1, name:"sumit"},
  {id:2, name:"sitesh"},
  {id:3, name:"stark"},
  {id:4, name:"Nilesh"}
]
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/users/userslist',(req,res)=>{
res.send(users);
});
router.get('/users/userslist/:id',(req,res)=>{
  const user = users.find(c=>c.id == req.params.id)
  if(!user){
    res.status(404).send('User with the given id is not found');
  }
  res.send(user);
})
router.post('/users/userslist',(req,res)=>{
  const user = {
    id: users.length + 1,
    name:req.body.name
  }
  users.push(user);
  res.send(user);
})


module.exports = router;
