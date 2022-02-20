import localStorage from "./localStorage";
import modal from "./modal";
import { Client } from "./@types";

const { readClient, createClient, updateClient, deleteClient } = localStorage;
const { closeModal, openModal, fillFields } = modal;

import { cpf } from "cpf-cnpj-validator";

// Validações do Form
const isValidFields = () => {
  // Verificando se as regras no HTML estão sendo cumpridas
  const element = document.getElementById("form") as HTMLFormElement;
  return element.reportValidity();
};

const clearTable = () => {
  const rows = document.querySelectorAll("#tableClient>tbody tr");
  // Pegando o tbody e removendo o filho dele, nesse caso, a própria linha
  rows.forEach((row) => row.parentNode?.removeChild(row));
};

// Atualizando Tabela ao carregar página
const updateTable = () => {
  const dbClient = readClient();
  clearTable();
  // Lendo o localStorage e criando uma linha para cada cliente
  dbClient.forEach(createRow);
};
// updateTable()

// Interação com o Layout
const saveClient = () => {
  if (isValidFields()) {
    const name = document.getElementById("name") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const taxId = document.getElementById("taxId") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    // Pegando valores do form após a validação
    const client = {
      name: name.value,
      email: email.value,
      taxId: taxId.value,
      password: password.value,
    };

    // Identificando se é um novo usuario ou editar um cliente
    const index = name.dataset.index || "new";
    if (index == "new") {
      // Utilizando a função do createCliente
      console.log("CPF sem value", taxId);
      console.log("CPF com value", taxId.value);
      createClient(client);
      alert("Seu usuário foi criado com sucesso!");
      updateTable();
      closeModal();
    } else {
      updateClient(index, client);
      updateTable();
      closeModal();
    }
  }
};

// Editando o cliente atraves da função do readClient e pedindo para carregar somente o valor do index que foi recebido no parametro, ou seja, no botao clicado correspondente da linha do cliente editado
const editClient = (index: number) => {
  const client = readClient()[index];
  client.index = index.toString();
  fillFields(client);
  openModal();
};

const editOrDelete = (event: any) => {
  // Para pegar o botão de edit e delete, estou utilizando o event que esta acontecendo dentro do tbody, o target é aonde estou clicando e o type para filtrar somente pelo botão
  if (event.target.type == "button") {
    // Aqui estou pegando o valor atributo personalizado para os botaos e separando o action e o index correspondente em dois elementos em um array com o action e o index
    const [action, index] = event.target.id.split("-");

    if (action == "edit") {
      editClient(index);
    } else {
      // Puxando nome do cliente com a função ReadClient
      const client: Client = readClient()[index];
      // Utilizando do template literal para confirmação de exclusao do client
      const response = confirm(
        `Deseja realmente excluir o cliente ${client.name}`
      );
      if (response) {
        deleteClient(Number(index));
        updateTable();
      }
    }
  }
};

// Pegando valores do LocalStorage e estruturando tabela conforme seus dados
// Ele recebe os valores de cada linha alem do indice de identificacao para os actions correspondente aquela row
const createRow = (client: Client, index: number) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${client.name}</td>
    <td>${client.email}</td>
    <td>${client.taxId}</td>
    <td>${client.password}</td>
    <td>
        <button type="button" class="button green" id="edit-${index}" >Editar</button>
        <button type="button" class="button red" id="delete-${index}">Excluir</button>
    </td>
    `;
  // Criando a visualização da tabela no HTML e inserindo o newRow
  document.querySelector("#tableClient>tbody")?.appendChild(newRow);
};

export default { saveClient, editOrDelete, updateTable };
