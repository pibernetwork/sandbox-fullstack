import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import app from './commands/app.js';

app.parse();
