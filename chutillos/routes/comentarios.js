var express = require('express');
var router = express.Router();
var Comentarios=require('../models/comentarios.model');

router.post('/',function(req, res, next) {
  let u=new Comentarios(req.body);
  u.save((err,comentarios)=>{
    if(err){
      return res.status(302).json({error:err,estado:'fail'});
    }
    if(comentarios){
      return res.status(200).json({comentarios:comentarios,estado:'Registrado correctamente'});
    }else
    return res.status(302).json({error:'no se que paso', estado:'fail'});
  });
});

router.get('/', function(req, res, next) {
    Comentarios.find({},(err,query)=>{
     if(err){
      return res.status(302).json({lista:[],error:err,estado:'fail'});

     }
     if(!query){
       return   res.status(302).json({lista:[],error:'no se que paso',estado:'fail'});
     }
    return res.status(200).json({lista:query,estado:'ok'});
    
   });
});

router.put('/:id', function(req, res, next) {
  let id=req.params.id;
  Comentarios.findById(id, async (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      query.nombre=req.body.nombre;
      query.descripcion=req.body.descripcion;
      query.hora=req.body.hora;
      query.dia=req.body.dia;
      query.tipodanza=req.body.tipodanza;
      try{
          let f= await query.save();
          return res.status(200).json({Comentarios:f,estado:'ok'});
      }
      catch(err){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      
  })
});
router.put('/otro/:id', function(req, res, next) {
  let id=req.params.id;
  Comentarios.findByIdAndUpdate(id,req.body, (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
    
          return res.status(200).json({Comentarios:query,estado:'ok'});
  })
});

router.delete('/:id', function(req, res, next) {
    Comentarios.findByIdAndDelete({_id: req.params.id },(err,query)=>{
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