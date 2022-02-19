type client = { name: string, email: string, phone: string, city: string}

// Funções de Conversões do localStorage
// Get - Transformar de string para Array
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client') || '[]');
// Set - Transformar de Array para String
const setLocalStorage = (dbClient: client[]) => localStorage.setItem('db_client', JSON.stringify(dbClient));

export { getLocalStorage, setLocalStorage }