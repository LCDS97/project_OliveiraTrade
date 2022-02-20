import localStorage from "./localStorage";
import { cpf } from 'cpf-cnpj-validator';

const { readClient, createClient } = localStorage;

const isValidFields = () => {
    // Verificando se as regras no HTML estão sendo cumpridas
    const element = document.getElementById("signUpForm") as HTMLFormElement;
    return element.reportValidity();
  };

const saveNewUser = () => {
    if (isValidFields()){
    const name = document.getElementById("register-name") as HTMLInputElement;
    const email = document.getElementById("register-email") as HTMLInputElement;
    const taxId = document.getElementById("register-taxId") as HTMLInputElement;
    const password = document.getElementById("register-pass") as HTMLInputElement;


    
    // Pegando valores do form após a validação
    //cpf.format(taxId.value)
    console.log(cpf)
    const client = {
      name: name.value,
      email: email.value,
      taxId: taxId.value,
      password: password.value,
      
    };


    // Identificando se é um novo usuario ou editar um cliente
    const index = name.dataset.index || "new";

    if (index == "new") {
      // Utilizando a função do createClient
       createClient(client);

      alert("Seu usuário foi criado com sucesso!");
      //document.location.reload()
    } else {
      alert("Não foi possível criar o usuário, tente novamente!");
    }
    }

};

export default { saveNewUser };
