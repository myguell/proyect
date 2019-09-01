var express = require('express');
var router = express.Router();
var Usuario=require('../models/usuario.model');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var Verificar=require('../middleware/autenticacion')

/* GET users listing. */
//crear ususario
router.post('/',function(req, res, next) {
  let u=new Usuario(req.body);
  //forma asincrona
  console.log(u);
  u.password=bcrypt.hashSync(u.password,10);
  u.save((err,usuario)=>{
    if(err){
      return res.status(302).json({error:err,estado:'fail'});
    }
    if(usuario){
      return res.status(200).json({usuario:usuario,estado:'ok'});
    }else
    return res.status(302).json({error:'no se que paso', estado:'fail'});
  });
});

router.post('/login',(req,res,next)=>{
  Usuario.find({login:req.body.login},(err,user)=>{
    if(err){
      return res.status(302),json({error:err,estado:'fail'});
    }
    if(user.length==0)
    return res.status(302).json({error:err,estado:'no hay usuario'});
    console.log(req.body.password,user[0].password);
    if(bcrypt.compareSync(req.body.password,user[0].password)){
      //crear el token 
      let token=jwt.sign({usuario:user[0],iat:Math.floor(Date.now() / 1000) - 30 }, 'shdn2io3u9j9348h9');
      console.log(token);
      return res.status(200).json({usuario:user[0],token:token,estado:'ok'});
    }else
    return res.status(300).json({error:'no se que paso', estado:'fail'});
  });
});

router.get('/',function(req, res, next) {
  Usuario.find({},(err,query)=>{
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
