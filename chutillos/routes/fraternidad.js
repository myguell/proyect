var express = require('express');
var router = express.Router();
var Fraternidad=require('../models/fraternidad.model');

router.post('/',function(req, res, next) {
  let f=new Fraternidad(req.body);
  f.save((err,fraternidad)=>{
    if(err){
      return res.status(302).json({error:err,estado:'fail'});
    }
    if(fraternidad){
      return res.status(200).json({fraternidad:fraternidad,estado:'Registrado correctamente'});
    }else
    return res.status(302).json({error:'no se que paso', estado:'fail'});
  });
});

router.get('/', function(req, res, next) {
  Fraternidad.find({},(err,query)=>{
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
  Fraternidad.findById(id, async (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      query.nombre=req.body.nombre;
      query.institucion=req.body.institucion;
      query.presidente=req.body.presidente;
      query.delegadoaffap=req.body.delegadoaffap;
      query.reina=req.body.reina;
      query.cantidad=req.body.cantidad;
      query.danza=req.body.danza;
      query.descripcion=req.body.descripcion;
      query.hora=req.body.hora;
      query.dia=req.body.dia;
      query.tipodanza=req.body.tipodanza;
      try{
          let f= await query.save();
          return res.status(200).json({fraternidad:f,estado:'ok'});
      }
      catch(err){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
      
  })
});
router.put('/otro/:id', function(req, res, next) {
  let id=req.params.id;
  Fraternidad.findByIdAndUpdate(id,req.body, (err,query)=>{
      if(err){
          return res.status(302).json({error:err,estado:'fail'});
      }
      if(!query){
          return res.status(302).json({error:'no se que paso',estado:'fail'});
      }
    
          return res.status(200).json({fraternidad:query,estado:'ok'});
  })
});

router.delete('/:id', function(req, res, next) {
  Fraternidad.findByIdAndDelete({_id: req.params.id },(err,query)=>{
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