import { program } from 'commander';

import myAction from '../actions/my-action.js';

const app = program.name('CLI').description('CLI program').version('1.0.0');

app.addCommand(myAction);

export default app;
