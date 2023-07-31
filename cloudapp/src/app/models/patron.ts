export class Patron {
  name: string;
  kennitala: string;
  strikamerki: string;

  constructor(name: string = '', kennitala: string = '', strikamerki: string = '') {
    this.name = name;
    this.kennitala = kennitala;
    this.strikamerki = strikamerki;
  }
}