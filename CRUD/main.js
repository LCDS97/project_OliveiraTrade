'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')

const tempClient = {
    nome: "Lucas Santos",
    email: "lucas.conceicao97@hotmail.com",
    celular: "(11)9987594671",
    cidade: "São Paulo"
}

// Funções de Conversões do localStorage // Get - Transformar de string para Array // Set - Transformar de Array para String
const getLocalStorage = () => JSON.parse(localStorage.getItem("db_client")) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

// CRUD

const createClient = ( client ) => {
    // Verificando que caso não exista o db_client no LocalStorage, ele vai retornar um array vazio
    const dbClient = getLocalStorage();
    dbClient.push(client)
    setLocalStorage(dbClient)
}


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)