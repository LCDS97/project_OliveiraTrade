type Client = {
    name: string,
    email: string,
    taxId: string,
    password: string,
    index? : string
}

type CheckInput = {
    inputEmail: HTMLInputElement,
    inputPassword: HTMLInputElement
}

export { Client, CheckInput }