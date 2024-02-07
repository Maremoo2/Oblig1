//meldingstjeneste.ts
import express, { Express, Request, Response } from 'express';
import { GameStateManager } from './GameStateManager';
import { ContractBid, DoubleBid, RedoubleBid, PassBid } from './Bid';
import { Suit, SuitHelper } from './Suit';
import { ContractLevel } from './Contract';
import { PositionHelper } from './Position';
import { spillere } from './players';
import { Kortstokk } from "./deck";

const gameStateManager = new GameStateManager();

// Initialize a deck of cards
const kortstokk = new Kortstokk();
kortstokk.lagKortstokk();
const stokketKortstokk = kortstokk.stokkKortstokk();

// Function to distribute cards to players
function distributeCardsToPlayers(spillere: any[]) {
  for (let i = 0; i < 4; i++) {
      spillere[i].kort = stokketKortstokk.slice(i * 13, (i + 1) * 13);
  }
}


// Initialize postkasser for each player
const postkasser: { id: number; navn: string; meldinger: string[] }[] = spillere.map(player => ({
  id: player.postkasseId,
  navn: player.navn,
  meldinger: []  // An empty array to store messages for each player
}));

export function initialiserMeldingstjeneste(app: Express, spillere: { navn: string, postkasseId: number, kort?: { farge: Suit; navn: string; verdi: number }[] }[]
  ): void {
  const REGLER: Record<string, string> = {
    pass: "Pass",
    doble: "Doble",
    redoble: "Redoble",
  };

  // Route to distribute cards to players
    app.post('/distribute-cards', (req, res) => {
      distributeCardsToPlayers(spillere);
      res.json({ success: true, message: 'Cards distributed to players' });
  })
  let passCount = 0; // Track the number of "pass" bids

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.post('/api/melding/bid', (req: Request, res: Response) => {
    console.log('Bidding route hit!');
    const melding = req.body.melding;
    const currentBiddingPlayer = gameStateManager.getNextBiddingPlayerPosition();
    // Find the player's name associated with the current bidding position
    const currentPlayer = spillere.find(player => player.navn === currentBiddingPlayer);

    if (!melding || req.body.player !== currentPlayer?.navn) {
      return res.status(400).json({ success: false, error: 'Invalid bid or not the correct player\'s turn' });
    }

    try {
      let bid;

      switch (melding.toLowerCase()) {
        case 'pass':
          bid = new PassBid();
          passCount++;

          if (passCount === 3) {
            // Bidding ends when all three players have bid "pass"
            console.log('Bidding phase completed.');
            // You can add additional logic here if needed
          }
          break;
        case 'doble':
          bid = new DoubleBid();
          break;
        case 'redoble':
          bid = new RedoubleBid();
          break;
        default:
          // Handle contract bids
          const parts = melding.split(' ');
          const level = parseInt(parts[0]) as ContractLevel;  // Ensure level is ContractLevel
          const suit = SuitHelper.fromLetter(parts[1]);
          const declarer = PositionHelper.fromLetter(parts[2]);

          if (!Number.isNaN(level) && suit && declarer) {
            bid = new ContractBid(suit, level);
            bid.declarer = declarer;
          } else {
            return res.status(400).json({ success: false, error: 'Ugyldig melding for bud' });
          }
      }

      // Handle the bid (store in-game state, check rules, etc.)
      // ...

      res.json({ success: true, message: 'Bud håndtert vellykket', bid });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Noe gikk galt under håndtering av budet' });
    }
  });

  app.post('/api/melding/spørre', (req: Request, res: Response) => {
    const melding = req.body.melding;

    if (!melding) {
      return res.status(400).json({ success: false, error: 'Melding er påkrevd' });
    }

    const svar = REGLER[melding.toLowerCase()];

    if (svar) {
      res.json({ success: true, svar });
    } else {
      res.status(400).json({ success: false, error: 'Ukjent melding for spørring' });
    }
  });

  // Endpoint to distribute cards to players
  app.post('/api/distribute-cards', (req: Request, res: Response) => {
    if (spillere.length !== 4) {
      return res.status(400).json({ success: false, error: 'Not enough players to distribute cards' });
    }
  // distribute cards to players
    const kortstokk: { farge: Suit, navn: string, verdi: number }[] = [];
    for (const suit of SuitHelper.all()) {
      for (let i = 0; i < 13; i++) {
        kortstokk.push({ farge: suit, navn: `${i + 1}`, verdi: i + 1 });
      }
    }
  
    // Shuffle the kortstokk
    const stokketKortstokk = kortstokk.sort(() => Math.random() - 0.5);
  
    // Distribute cards to players
    for (let i = 0; i < 4; i++) {
      spillere[i].kort = stokketKortstokk.slice(i * 13, (i + 1) * 13);
    }
  
    return res.json({ success: true, message: 'Cards distributed successfully' });
  });
}
