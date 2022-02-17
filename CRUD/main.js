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


// Pegando valores do LocalStorage e estruturando tabela conforme seus dados
// Ele recebe os valores de cada linha alem do indice de identificacao para os actions correspondente aquela row
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `
    // Criando a visualização da tabela no HTML e inserindo o newRow
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    // Pegando o tbody e removendo o filho dele, nesse caso, a própria linha
    rows.forEach(row => row.parentNode.removeChild(row))
}

// Atualizando Tabela ao carregar página
const updateTable = () => {
    const dbClient = readClient()
    clearTable();
    // Lendo o localStorage e criando uma linha para cada cliente
    dbClient.forEach(createRow)
}
updateTable()

// Validações do Form
const isValidFields = () => {
    // Verificando se as regras no HTML estão sendo cumpridas
    return document.getElementById('form').reportValidity();

}

// Após clicar em editar, o form vai ser preenchido com as info do cliente a ser editado
const fillFields = (client) => {
    document.getElementById('name').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('cellphone').value = client.celular
    document.getElementById('city').value = client.cidade
    // Retirando o dataset new para indicar que é o form de edição
    document.getElementById('name').dataset.index = client.index
};

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
        // Identificando se é um novo usuario ou editar um cliente
        const index = document.getElementById('name').dataset.index;
        if (index == 'new') {
        // Utilizando a função do createCliente
        createClient(client);
        alert('Seu usuário foi criado com sucesso!')
        updateTable()
        closeModal()            
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }

    }
}

// Editando o cliente atraves da função do readClient e pedindo para carregar somente o valor do index que foi recebido no parametro, ou seja, no botao clicado correspondente da linha do cliente editado
const editClient = (index) => {
    const client = readClient()[index];
    client.index = index
    fillFields(client);
    openModal();
}

const editOrDelete = ( event ) => {
    // Para pegar o botão de edit e delete, estou utilizando o event que esta acontecendo dentro do tbody, o target é aonde estou clicando e o type para filtrar somente pelo botão
    if(event.target.type == 'button'){
        // Aqui estou pegando o valor atributo personalizado para os botaos e separando o action e o index correspondente em dois elementos em um array com o action e o index
        const [action, index] = event.target.id.split('-')
        
        if(action == 'edit'){
            editClient(index)
        } else {
            // Puxando nome do cliente com a função ReadClient
            const client = readClient()[index]
            // Utilizando do template literal para confirmação de exclusao do client
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if(response){
                deleteClient(index)
                updateTable()
            }
        }
    }
}


// Eventos
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('save')
    .addEventListener('click', saveClient)

document.getElementById('cancel')
    .addEventListener('click', closeModal)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editOrDelete)

