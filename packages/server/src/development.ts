import consola from 'consola';
import dotenv from 'dotenv';

import app from './index.js';

dotenv.config();
app.listen(4000, () => consola.info('Server started on port 4000'));
