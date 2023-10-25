export class Patron {
  name: string;
  polishName: string;
  kennitala: string;
  strikamerki: string;
  primaryId: string;

  constructor(name: string = '', polishName: string = '', kennitala: string = '', strikamerki: string = '', primaryId: string) {
    this.name = name;
    this.polishName = polishName;
    this.kennitala = kennitala;
    this.strikamerki = strikamerki;
    this.primaryId = primaryId;
  }
}