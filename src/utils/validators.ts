export class Validator {
  _handlerVal = [
    { action: (val) => this.isValidCPF(val), pixType: 3 },
    { action: (val) => this.isValidEmail(val), pixType: 2 },
    { action: (val) => this.isValidPhone(val), pixType: 1 },
  ];

  constructor() {
  }

  private isValidCPF(cpf) {
    const regexCPF = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;
    return regexCPF.test(cpf);
  }

  private isValidEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  private isValidPhone(telefone) {
    const regexTelefone = /^(\+?\d{2}?)?(\(?\d{2}\)?)?(\d{4,5}-?\d{4})$/;
    return regexTelefone.test(telefone);
  }

  pixKeyTypeWhenValid(val: string): number | undefined {
    const checks = this._handlerVal.map(({ action, pixType }) => {
      return { result: action(val), pixType };
    });

    return checks.find(({ result }) => result == true)?.pixType;
  }
}
