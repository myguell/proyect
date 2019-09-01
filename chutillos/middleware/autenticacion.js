var jwt=require('jsonwebtoken');
 var secret=require('../config/config');

exports.VerificarToken=function(req,res,next){
    //dominio.com/usuario/?token
    let token=req.query.token;
 jwt.verify(token,secret.PalabraSecreta,(err,decode)=>{
     if(err){
         return res.status(401).json({
             estado:'fail',
             error:err,
             msg:'Archivo Privado'
         });
     }
     req.cliente=decode.cliente;
     next();
 })
}