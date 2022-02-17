'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal')
    .classList.remove('active')
}

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '');
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

// DELETE - Pegando o valor do indice e excluindo a partir dele
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

// Validações do Form
const isValidFields = () => {
    // Verificando se as regras no HTML estão sendo cumpridas
    return document.getElementById('form').reportValidity();

}

// Interação com o Layout
const saveClient = () => {
    if (isValidFields()) {
        // Pegando valores do form após a validação
        const client = {
            nome: document.getElementById('name').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('cellphone').value,
            cidade: document.getElementById('city').value,
        }
        // Utilizando a função do createCliente
        createClient(client);
        alert('Seu usuário foi criado com sucesso!')
        closeModal()
    }
}

const createRow = (client) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green">editar</button>
        <button type="button" class="button red">excluir</button>
    </td>
    `
    // Criando a visualiza;'a
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

// Atualizando Tabela ao carregar página
const updateTable = () => {
    const dbClient = readClient()
    // Lendo o localStorage e criando uma linha para cada cliente
    dbClient.forEach(createRow)
}
updateTable()

// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)