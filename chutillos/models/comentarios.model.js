var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var esquema=new Schema({
    nombre:{type:String},
    descripcion:{type:String},
    fecha:{type:Date}
});
module.exports=mongoose.model('Comentarios',esquema);