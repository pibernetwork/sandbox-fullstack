import consola from 'consola';
import dotenv from 'dotenv';

import app from './index.js';

dotenv.config();
app.listen(3000, () => consola.info('Server started on port 3000'));
