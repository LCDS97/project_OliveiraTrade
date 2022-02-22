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

type ToggleElements = {
    elem1: HTMLFormElement | HTMLDivElement;
    elem2: HTMLFormElement | HTMLDivElement;
    linkIn: HTMLAnchorElement | HTMLButtonElement;
    linkOut: HTMLAnchorElement | HTMLButtonElement;
  }

export { Client, CheckInput, ToggleElements }