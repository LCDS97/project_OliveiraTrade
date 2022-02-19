import "./css/button.css";
import "./css/main.css";
import "./css/modal.css";
import "./css/records.css";
import "./css/login.css";

import { modal, table } from "./scripts";

interface ToggleElements {
  elem1: HTMLFormElement | HTMLDivElement;
  elem2: HTMLFormElement | HTMLDivElement;
  linkIn: HTMLAnchorElement | HTMLButtonElement;
  linkOut: HTMLAnchorElement | HTMLButtonElement;
}

const addEventListeners = () => {
  const createClient = document.getElementById(
    "cadastrarCliente"
  ) as HTMLDivElement;
  const modalClose = document.getElementById("modalClose") as HTMLDivElement;
  const saveClient = document.getElementById("save") as HTMLDivElement;
  const cancel = document.getElementById("cancel") as HTMLDivElement;
  const editOrDelete = document.querySelector(
    "#tableClient>tbody"
  ) as HTMLTableElement;

  createClient.addEventListener("click", modal.openModal);
  modalClose.addEventListener("click", modal.closeModal);
  saveClient.addEventListener("click", table.saveClient);
  cancel.addEventListener("click", modal.closeModal);
  editOrDelete.addEventListener("click", table.editOrDelete);
};

const toggleElements = ({ elem1, elem2, linkIn, linkOut }: ToggleElements) => {
  // Função para fazer o troca de classes entre Sign In Sign Up
  const toggleElemClass = () => {
    elem1.classList.toggle("hiddenForm");
    elem2.classList.toggle("hiddenForm");
  };
  // Definindo a classe hiddenForm no carregamento da página para esconder o SignUp e ao clicar troca a classe entre eles
  elem2.classList.toggle("hiddenForm");
  linkIn.addEventListener("click", toggleElemClass);
  linkOut.addEventListener("click", toggleElemClass);
};

window.onload = () => {
  addEventListeners();
  table.updateTable();

  const signIn = document.querySelector("#signInForm") as HTMLFormElement;
  const signUp = document.querySelector("#signUpForm") as HTMLFormElement;
  const signInLink = document.querySelector(
    "#signInForm>a"
  ) as HTMLAnchorElement;
  const signUpLink = document.querySelector(
    "#signUpForm>a"
  ) as HTMLAnchorElement;

  toggleElements({elem1: signIn, elem2: signUp, linkIn: signInLink, linkOut: signUpLink});
};
