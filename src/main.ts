import './css/button.css';
import './css/main.css';
import './css/modal.css';
import './css/records.css';

import { modal, table } from './scripts';


const addEventListeners = () => {

  const createClient = document.getElementById('cadastrarCliente') as HTMLDivElement
  const modalClose = document.getElementById('modalClose')  as HTMLDivElement
  const saveClient = document.getElementById('save')  as HTMLDivElement
  const cancel = document.getElementById('cancel')  as HTMLDivElement
  const editOrDelete = document.querySelector('#tableClient>tbody') as HTMLTableElement

  createClient.addEventListener('click', modal.openModal)
  modalClose.addEventListener('click', modal.closeModal)
  saveClient.addEventListener('click', table.saveClient)
  cancel.addEventListener('click', modal.closeModal)
  editOrDelete.addEventListener('click', table.editOrDelete)
}
window.onload = () => {
    addEventListeners();
    table.updateTable();
}