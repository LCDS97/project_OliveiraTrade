'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Amanda Santos",
    email: "a.lisboa97@hotmail.com",
    celular: "(11)9987594671",
    cidade: "São Paulo"
}

// Funções de Conversões do localStorage
// Get - Transformar de string para Array
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
// Set - Transformar de Array para String
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD


// READ - Somente lê os dados que estão no localStorage
const readClient = () => getLocalStorage()



// CREATE - É criado cliente com os dados recebido do parametro, executa a função de verificar o que esta armazenado no LocalStorage
//          Após isso, é feito a conversão de String para Array, uso a função do push nativa do JS para armazenar um novo valor no array
//          E por último executamos a função do setLocalStorage para criação do usuário no LocalStorage de Array para String           
const createClient = ( client ) => {
    // Verificando que caso não exista o db_client no LocalStorage, ele vai retornar um array vazio
    const dbClient = getLocalStorage();
    dbClient.push(client)
    setLocalStorage(dbClient)
}

// UPDATE - Pegando o valor do indice do Cliente que eu quero editar, assim ele vai atualizar o index aonde se encontra as info atuais e atualizar pelas que recebeu do parametro client

const updateClient = ( index, client ) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)

}

// DELETE - Pegando o valor do indice
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)