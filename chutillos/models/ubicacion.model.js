var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Fraternidad=require('./fraternidad.model')
var esquema=new Schema({
    latitud:{type:String,required:true},
    longitud:{type:String},
    fraternidad:{type:String},
    hora:{type:String},
    dia:{type:String},
    estado:{type:Number},
    comentario:{type:String},
    fotos:{type:String}
});
module.exports=mongoose.model('Ubicacion',esquema);