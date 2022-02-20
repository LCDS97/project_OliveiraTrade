import localStorage from "./localStorage";

import { CheckInput, Client } from "./@types";
const { readClient, createClient } = localStorage;

const checkInput = ({ inputEmail, inputPassword }: CheckInput) => {
  const allClients = readClient();
  console.log(inputEmail.value, inputPassword.value);

  const foundClient = allClients.find((client) => {
    const checkEmail = client.email === inputEmail.value;
    const checkPassword = client.password === inputPassword.value;

    if (checkEmail && checkPassword) {
      return client;
    }
    return undefined;
  });
  return foundClient;
};

export default { checkInput };
