import { Client, GatewayIntentBits } from 'discord.js';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!DISCORD_TOKEN || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing required environment variables. Please check your .env file.');
}

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bot ready event
client.once('ready', () => {
  console.log(`✓ Bot logged in as ${client.user?.tag}`);
  console.log('✓ Homeless-Bot is ready to go!');
});

// Bot error handler
client.on('error', (error) => {
  console.error('Discord client error:', error);
});

// Process error handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Login to Discord
client.login(DISCORD_TOKEN);

export { client, supabase };
