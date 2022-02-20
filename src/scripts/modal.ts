import { Client } from "./@types";

const clearFields = () => {
  const fields = document.querySelectorAll<HTMLInputElement>(".modal-field");
  fields.forEach((field) => (field.value = ""));
};

const openModal = () => {
  const element = document.getElementById("modal");
  if (!element) return;
  element.classList.add("active");
};

const closeModal = () => {
  clearFields();
  const element = document.getElementById("modal");
  if (!element) return;
  element.classList.remove("active");
};

// Após clicar em editar, o form vai ser preenchido com as info do cliente a ser editado
const fillFields = (client: Client) => {
  const name = document.getElementById("name") as HTMLInputElement;
  const email = document.getElementById("email") as HTMLInputElement;
  const taxId = document.getElementById("taxId") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;
  name.value = client.name;
  email.value = client.email;
  taxId.value = client.taxId;
  password.value = client.password;
  // Retirando o dataset new para indicar que é o form de edição
  name.dataset.index = client.index;
};

export default { closeModal, openModal, fillFields };
