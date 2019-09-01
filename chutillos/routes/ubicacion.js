var express = require('express');
var router = express.Router();
var Ubicacion=require('../models/ubicacion.model');

router.post('/',function(req, res, next) {
  let u=new Ubicacion(req.body);
  u.save((err,ubicacion)=>{
    if(err){
      return res.status(302),json({error:err,estado:'fail'});
    }
    if(ubicacion){
      return res.status(200).json({ubicacion:ubicacion,estado:'Registrado correctamente'});
    }else
    return res.status(302),json({error:'no se que paso', estado:'fail'});
  });
});

router.get('/', function(req, res, next) {
    Ubicacion.find({},(err,query)=>{
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
  Ubicacion.findById(id, async (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      query.latitud=req.body.latitud;
      query.longitud=req.body.longitud;
      query.fraternidad=req.body.fraternidad;
      query.hora=req.body.hora;
      query.dia=req.body.dia;
      query.estado=req.body.estado;
      query.comentario=req.body.comentario;
      query.fotos=req.body.fotos;
      try{
          let u= await query.save();
          return res.status(200).json({ubicacion:u,estado:'ok'});
      }
      catch(err){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      
  })
});
router.put('/otro/:id', function(req, res, next) {
  let id=req.params.id;
  Ubicacion.findByIdAndUpdate(id,req.body, (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
    
          return res.status(200).json({ubicacion:query,estado:'ok'});
  })
});

router.delete('/:id', function(req, res, next) {
  Ubicacion.findByIdAndUpdate({_id: req.params.id },(err,query)=>{
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