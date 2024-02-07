//deck.ts
//Her blir kortstokken laget, definert og stokket
// Denne klassen definerer kortklassen
export class Kort {
    public navn: string;
    public farge: string;
    public verdi: number;

    constructor(farge: string, navn: string, verdi: number) {
        this.navn = navn;
        this.farge = farge;
        this.verdi = verdi;
    }
}

// Her defineres kortstokken med 52 kort
export class Kortstokk {
    public kort: Kort[];
    public farger: string[];
    public navn: string[];
    public verdier: number[];

    constructor() {
        this.kort = [];
        this.farger = ['♥', '♠', '♦', '♣'];
        this.navn = ['Ess', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Knekt', 'Dame', 'Konge'];
        this.verdier = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    }

    // Her blir kortstokken laget
    // Den første løkken vil iterere gjennom kortstokkens farger.
    // Den innebygde løkken vil iterere gjennom navnene og verdiene til kortene.
    // Dette vil legge til kortobjekter i den tomme kortstokken (kort array).
    public lagKortstokk(): void {
        console.log('Oppretter en ny kortstokk');
        for (let i = 0; i < this.farger.length; i++) {
            for (let n = 0; n < this.navn.length; n++) {
                this.kort.push(new Kort(this.farger[i], this.navn[n], this.verdier[n]));
            }
        }
    }

    // Denne metoden vil stokke kortstokken
    // Denne for-løkken er satt til 52 iterasjoner fordi vi ønsker å stokke 52 kort
    // Dette vil ta det siste elementet i arrayet og multiplisere det med et tilfeldig tall
    // Dette vil sette variabelen tilfeldigKort til det spliced objektet basert på det tilfeldige tallet
    // Dette vil legge til det tilfeldige objektet fra oven i en ny tom array kalt
    public stokkKortstokk(): Kort[] {
        console.log('Stokker kortstokken');
        const stokketKortstokk: Kort[] = [];
        for (let i = 0; i < 52; i++) {
            let tilfeldigPosisjon = Math.floor((this.kort.length - i) * Math.random());
            let tilfeldigKort = this.kort.splice(tilfeldigPosisjon, 1);
            stokketKortstokk.push(...tilfeldigKort);
        }
        return stokketKortstokk;
    }
}
