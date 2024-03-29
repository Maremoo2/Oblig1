// src/server.ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let players: { name: string, mailboxId: number }[] = [];
let mailboxes: { id: number; name: string; messages: string[] }[] = [];
let contacts: string[] = [];

// Endpoint to register players
app.post('/register', (req: Request, res: Response) => {
  const playerName: string = req.body.playerName;

  if (!playerName) {
    return res.status(400).json({ success: false, error: 'Player name is required' });
  }

  // Create a unique ID for the mailbox
  const mailboxId = mailboxes.length + 1;

  // Create a mailbox for the player
  const newMailbox = { id: mailboxId, name: playerName, messages: [] };
  mailboxes.push(newMailbox);

  players.push({ name: playerName, mailboxId });
  return res.json({ success: true, message: `${playerName} registered successfully` });
});

// Endpoint to get the next player in turn
app.get('/nextPlayer', (req: Request, res: Response) => {
  if (players.length === 0) {
    return res.json({ success: false, error: 'No players registered' });
  }

  const nextPlayer = players.shift();
  return res.json({ success: true, nextPlayer });
});

// Endpoint to list mailboxes
app.get('/mailboxes', (req: Request, res: Response) => {
  return res.json({ success: true, mailboxes });
});

// Endpoint to list messages in a mailbox
app.get('/mailboxes/:mailboxId/messages', (req: Request, res: Response) => {
  const { mailboxId } = req.params;
  const selectedMailbox = mailboxes.find((mailbox) => mailbox.id === parseInt(mailboxId));

  if (!selectedMailbox) {
    return res.status(404).json({ success: false, error: 'Mailbox not found' });
  }

  return res.json({ success: true, messages: selectedMailbox.messages });
});

// Endpoint to get a message in a mailbox
app.get('/mailboxes/:mailboxId/messages/:messageId', (req: Request, res: Response) => {
  const { mailboxId, messageId } = req.params;
  const selectedMailbox = mailboxes.find((mailbox) => mailbox.id === parseInt(mailboxId));

  if (!selectedMailbox) {
    return res.status(404).json({ success: false, error: 'Mailbox not found' });
  }

  const selectedMessage = selectedMailbox.messages[parseInt(messageId)];

  if (!selectedMessage) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }

  return res.json({ success: true, message: selectedMessage });
});

// Endpoint to delete a message in a mailbox
app.delete('/mailboxes/:mailboxId/messages/:messageId', (req: Request, res: Response) => {
  const { mailboxId, messageId } = req.params;
  const selectedMailbox = mailboxes.find((mailbox) => mailbox.id === parseInt(mailboxId));

  if (!selectedMailbox) {
    return res.status(404).json({ success: false, error: 'Mailbox not found' });
  }

  const deletedMessage = selectedMailbox.messages.splice(parseInt(messageId), 1);

  if (!deletedMessage || deletedMessage.length === 0) {
    return res.status(404).json({ success: false, error: 'Message not found' });
  }

  return res.json({ success: true, message: 'Message deleted successfully' });
});

// Endpoint to send a message to a mailbox
app.post('/mailboxes/:mailboxId/messages', (req: Request, res: Response) => {
  const { mailboxId } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: 'Message is required' });
  }

  const selectedMailbox = mailboxes.find((mailbox) => mailbox.id === parseInt(mailboxId));

  if (!selectedMailbox) {
    return res.status(404).json({ success: false, error: 'Mailbox not found' });
  }

  selectedMailbox.messages.push(message);
  return res.json({ success: true, message: 'Message sent successfully' });
});

// Endpoint to list contacts
app.get('/contacts', (req: Request, res: Response) => {
  return res.json({ success: true, contacts });
});

// Endpoint to add a contact
app.post('/contacts', (req: Request, res: Response) => {
  const { contact } = req.body;

  if (!contact) {
    return res.status(400).json({ success: false, error: 'Contact is required' });
  }

  contacts.push(contact);
  return res.json({ success: true, message: 'Contact added successfully' });
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});


// Denne brukes i powershell for å registrere bruker
//Invoke-RestMethod -Uri "http://localhost:3000/register" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"playerName": "Player1"}'

// neste spiller
//Invoke-RestMethod -Uri "http://localhost:3000/nextPlayer" -Method Get

