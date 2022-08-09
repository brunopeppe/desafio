const mongoose = require('mongoose');

const ContatoSchema = new mongoose.Schema({
  placa: { type: String, required: true },
  ferrovia: { type: String, required: false, default: '' },
  produto: { type: String, required: false, default: '' },
  peso: { type: Number, required: false, default: ''  },
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
  this.body = body;
  this.errors = [];
  this.contato = null;
}

Contato.prototype.register = async function() {
  this.valida();
  console.log('oi')
  if(this.errors.length > 0) return;
  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function() {
  this.cleanUp();
  console.log('oi')
  // Validação
  if(!this.body.placa) this.errors.push('placa é um campo obrigatório.');
  if(!this.body.produto ) this.errors.push('produto é um campo obrigatório.');
  if(!this.body.peso ) this.errors.push('peso é um campo obrigatório.');
  console.log(this.errors)
  console.log('oi')
  
};

Contato.prototype.cleanUp = function() {
  for(const key in this.body) {
    console.log('oi')
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }
  console.log('oi')

  this.body = {
    placa: this.body.placa,
    ferrovia: this.body.ferrovia,
    produto: this.body.produto,
    peso: this.body.peso,
  };
};

// Contato.prototype.edit = async function(id) {
//   if(typeof id !== 'string') return;
//   this.valida();
//   if(this.errors.length > 0) return;
//   this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true });
// };

// Métodos estáticos
// Contato.buscaPorId = async function(id) {
//   if(typeof id !== 'string') return;
//   const contato = await ContatoModel.findById(id);
//   return contato;
// };

// Contato.buscaContatos = async function() {
//   const contatos = await ContatoModel.find()
//     .sort({ criadoEm: -1 });
//   return contatos;
// };

// Contato.delete = async function(id) {
//   if(typeof id !== 'string') return;
//   const contato = await ContatoModel.findOneAndDelete({_id: id});
//   return contato;
// };


module.exports = Contato;