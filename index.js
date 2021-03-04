const inquirer = require('inquirer');
const fs = require('fs');
const {ctrlPet, cadastrarPet, buscadorPet} = require('./controlePet');
const petsCadastrados = require('./petsCadastrados.json');


//Função construtora dos pets
function ConstrutorPet(id, nome, raca, dono) {
    this.id = id;
    this.nome = nome
    this.raca = raca
    this.dono = dono
};


/*--- MECANISMO DE CONTROLE DO PETSHOP: Através dele é possível cadastrar novos pets; listar os pets cadastrados; e buscar por seus dados ---*/

fs.readFile('./petsCadastrados.json', 'utf-8', (err, jsonPets) => { //Converte o arquivo JSON para que estes possam ser trabalhados.
    if(err) throw err;
    let arrayPets = JSON.parse(jsonPets);

    //Controle: seletor que permite atribuir uma tarefa ao mecanismo
    inquirer.prompt(ctrlPet).then(resposta => {
        switch(resposta.opcao) {
            case 0: 
                    //-- Cadastrador: Permite inserir novos entrantes ao sistema -----------------------
                    inquirer.prompt(cadastrarPet).then(pet => {
                        let novoPet = new ConstrutorPet(pet.id, pet.nome, pet.raca, pet.dono);
                        arrayPets.push(novoPet);
                        const listaAtualizada = () => JSON.stringify(arrayPets, null, 2);

                        fs.writeFile('./petsCadastrados.json', listaAtualizada(), err => {//Sobrescreve o arquivo JSON com os novos dados inseridos
                            if(err) throw err;
                            console.log('Parabéns !!! seu pet agora é parte da nossa família');
                        });
                    });        
                    break;
                    //-- fim Cadastrador --------------------

            case 1: 
                    //-- Listar: Emite uma lista com os pets cadastrados ------------
                    console.log('\n');
                    arrayPets.forEach((objeto) =>{
                        let dadosPet = Object.entries(objeto)
                        for(let elem of dadosPet) {
                            console.log(`${elem[0]}: ${elem[1]}`);
                        }
                        console.log('\n');
                    });
                    break;
                    //-- fim listar -----------------------    
            case 2: 
                    //-- Buscador: Mecanismo de busca de dados com base no nome do animal ---------------------------
                    inquirer.prompt(buscadorPet).then(resposta => {
                        for(let objeto of arrayPets) {
                            if(resposta.nome === objeto.nome) {
                                let dadosPet = Object.entries(objeto);
                                dadosPet.forEach((array) => {
                                console.log(`${array[0]}: ${array[1]}`)
                            });
                    }
                } 
            })
                    break; 
                    //-- fim Buscador -----------------------
        }       
    });//-- fim Controle ------------------------------------
})
/*--- FIM MECANISMO DE CONTROLE ---------------------------------------------------------------------------------------------------------------*/