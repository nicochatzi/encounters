const maxApi = require('max-api');
const { Chord, Note } = require('tonal');
const Discord = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  const [rawRoot, name] = message.content.split(' ');
  const midiRoot = Note.midi(rawRoot);
  const root = Note.fromMidi(midiRoot);
  const chord = Chord.notes(root, name);
  const midiNotes = chord.map(Note.midi);
  console.log(midiNotes);
  maxApi.outlet(midiNotes);
});

client.login(process.env.DISCORD_TOKEN);
