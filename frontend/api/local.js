import app from './index.js';
import { initDb } from './database.js';

const port = process.env.PORT || 3000;

initDb().then(() => {
    app.listen(port, () => {
        console.log(`Local API server running on port ${port}`);
    });
});
