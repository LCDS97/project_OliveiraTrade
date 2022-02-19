import { Client } from './@types';

const clearFields = () => {
    const fields = document.querySelectorAll<HTMLInputElement>('.modal-field')
    fields.forEach(field => field.value = '');
}

const openModal = () => {
    const element = document.getElementById('modal');
    if(!element) return;
    element.classList.add('active')
}

const closeModal = () => {
    clearFields()
    const element = document.getElementById('modal');
    if(!element) return;
    element.classList.remove('active')
}


// Após clicar em editar, o form vai ser preenchido com as info do cliente a ser editado
const fillFields = (client: Client) => {
    const name = document.getElementById('name') as HTMLInputElement
    const email = document.getElementById('email') as HTMLInputElement
    const phone = document.getElementById('cellphone') as HTMLInputElement
    const city = document.getElementById('city') as HTMLInputElement
    name.value = client.name
    email.value = client.email
    phone.value = client.phone
    city.value = client.city
    // Retirando o dataset new para indicar que é o form de edição
    name.dataset.index = client.index
};

export default { closeModal, openModal, fillFields } 