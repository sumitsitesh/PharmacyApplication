const Joi = require('joi');
var express = require('express');
var router = express.Router();

Medicines=[
  {id:1, name:"Ativan", type:"tablet", ExpDate:"22/11/2019", Price:"100", manufacturer:"Cipla"},
  {id:2, name:"Atorvastatin", type:"syrup", ExpDate:"22/11/2019", Price:"200", manufacturer:"Cipla"},
  {id:3, name:"Amlodipine", type:"capsul", ExpDate:"22/11/2019", Price:"300", manufacturer:"Cipla"},
  {id:4, name:"Adderall", type:"gel", ExpDate:"22/11/2019", Price:"400", manufacturer:"Cipla"},
  {id:5, name:"Amrutanjan", type:"gel", ExpDate:"22/11/2022", Price:"200", manufacturer:"Patanjali"}
]
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/',(req,res)=>{
res.send(Medicines);
});
router.get('/medicineslist/:id',(req,res)=>{
  const med = Medicines.find(c=>c.id == req.params.id)
  if(!med){
    res.status(404).send('User with the given id is not found');
  }
  res.send(med);
})
router.post('/addmedicineslist',(req,res)=>{
  const schema = {
    name:Joi.string().min(3).required(),
    type:Joi.string().min(3).required(),
    ExpDate:Joi.string().min(3).required(),
    Price:Joi.string().min(1).required(),
    manufacturer:Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body,schema);
  if(result.error){
    res.status(404).send(result.error.details[0].message)
    return;
  }
  const med = {
    id: Medicines.length + 1,
    name:req.body.name,
    type:req.body.type,
    ExpDate:req.body.ExpDate,
    Price:req.body.Price,
    manufacturer:req.body.manufacturer
  }
  Medicines.push(med);
  res.send(med);
})

router.put('/medicineslist/:id', (req,res)=>{
  const med = Medicines.find(c=>c.id == req.params.id)
  if(!med){
    res.status(404).send('medicine with the given id is not found');
  }
  const schema = {
    id:req.params.id,
    name:req.body.name,
    type:req.body.type,
    ExpDate:req.body.ExpDate,
    Price:req.body.Price,
    manufacturer:req.body.manufacturer
  };
  const result = Joi.validate(req.body,schema);
  if(result.error){
    res.status(404).send(result.error.details[0].message)
    return;
  }
  const medObj = {
    id:req.params.id,
    name:req.body.name,
    type:req.body.type,
    ExpDate:req.body.ExpDate,
    Price:req.body.Price,
    manufacturer:req.body.manufacturer
  }
  res.send(medObj);

})

router.delete('/medicineslist/:id',(req,res)=>{
  const med = Medicines.find(c=>c.id == req.params.id)
  if(!med){
    res.status(404).send('medicine with the given id is not found');
  }

  const index = Medicines.indexOf(med);
  Medicines.splice(index,1);
  res.send(med);
})


module.exports = router;