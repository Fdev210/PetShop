const fs = require('fs');
const petsCadastrados = require('./petsCadastrados.json');

let arrayPets = JSON.parse(fs.readFileSync('./petsCadastrados.json'))

//---------------------------------------------------------------------
//Controle
const ctrlPet = [{
    type: 'list',
    name: 'opcao',
    message: 'O que você quer fazer ?',
    choices: [{name: 'Cadastrar novo pet', value: 0},
              {name: 'Listar todos os pets cadastrados', value: 1},
              {name: 'Buscar dados do pet por nome', value: 2}]
}];

//Cadastrar
const cadastrarPet = [{
    type: 'input',
    name: 'id',
    message: 'insira um ID por favor: ',
    validate: (input) => {     
        for (let dado of arrayPets) {
            if(input === dado.id) {
                console.log(' Id já cadastrado')
                return false;
            }
        }

        return true;
        } 
}, {
    type: 'input',
    name: 'nome',
    message: 'Como o pet se chama ? '
}, {
    type: 'input',
    name: 'raca',
    message: 'De que raça ele é ? '
}, {
    type: 'input',
    name: 'dono',
    message: 'Como se chama seu dono ? '
}];

//Buscador
const buscadorPet = [{
    type: 'input',
    name: 'nome',
    message: 'Digite o nome de seu pet: '
}]
//---------------------------------------------------------------------


module.exports = {
    ctrlPet,
    cadastrarPet,
    buscadorPet
};