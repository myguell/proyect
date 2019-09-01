var express = require('express');
var router = express.Router();
var Cliente=require('../models/cliente.model');

//crear cliente
router.post('/',function(req, res, next) {
    let u=new Cliente(req.body);
    u.save((err,cliente)=>{
      if(err){
        return res.status(302),json({error:err,estado:'fail'});
      }
      if(cliente){
        return res.status(200).json({cliente:cliente,estado:'Registrado correctamente'});
      }else
      return res.status(302),json({error:'no se que paso', estado:'fail'});
    });
  });
  
router.get('/', function(req, res, next) {
      Cliente.find({},(err,query)=>{
       if(err){
        return res.status(302).json({lista:[],error:err,estado:'fail'});
  
       }
       if(!query){
         return   res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
       }
      return res.status(200).json({lista:query,estado:'ok'});
      
     });
  });
module.exports = router;
