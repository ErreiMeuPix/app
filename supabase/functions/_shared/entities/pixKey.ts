export class PixKey {

    constructor(val: string) {
        this.value = val.trim().toLowerCase();
    }

    value: string


    valid() {

        if (!this.value) {
            return false;
        }

        if (this.value.localeCompare("", undefined, { sensitivity: 'accent' }) == 0) {
            return false;
        }

        // Validar modelos de chave pix

        return true
    }
}


