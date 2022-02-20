export class ValidarCpf {

    constructor() {

    }

    public static taxId(taxId: string): boolean {
        if (taxId == null) {
            return false;
        }
        if (taxId.length != 11) {
            return false;
        }
        if ((taxId == '00000000000') || (taxId == '11111111111') || (taxId == '22222222222') || (taxId == '33333333333') || (taxId == '44444444444') || (taxId == '55555555555') || (taxId == '66666666666') || (taxId == '77777777777') || (taxId == '88888888888') || (taxId == '99999999999')) {
            return false;
        }
        let numero: number = 0;
        let caracter: string = '';
        let numeros: string = '0123456789';
        let j: number = 10;
        let somatorio: number = 0;
        let resto: number = 0;
        let digito1: number = 0;
        let digito2: number = 0;
        let taxIdAux: string = '';
        taxIdAux = taxId.substring(0, 9);
        for (let i: number = 0; i < 9; i++) {
            caracter = taxIdAux.charAt(i);
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        taxIdAux = taxIdAux + digito1;
        for (let i: number = 0; i < 10; i++) {
            caracter = taxIdAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        taxIdAux = taxIdAux + digito2;
        if (taxId != taxIdAux) {
            return false;
        }
        else {
            return true;
        }
    }

}