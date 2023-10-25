export class Patron {
  name: string;
  polishName: string;
  kennitala: string;
  primaryId: string;
  strikamerki: string;

  constructor(name: string = '', polishName: string = '', kennitala: string = '', primaryId: string, strikamerki: string = '' ) {
    this.name = name;
    this.polishName = polishName;
    this.kennitala = kennitala;
    this.primaryId = primaryId;
    this.strikamerki = strikamerki;
  }
}