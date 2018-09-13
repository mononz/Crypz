const functions = require('firebase-functions');
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');

let cStake = require('../controller/stake');
let cSync  = require('../controller/sync');

let app = express();
app.use(cors({ origin: true }));
app.use(helmet());

let router = express.Router();

/// STAKE ROUTES ///
router.get('/stake/:id', cStake.getById);
router.post('/stake', cStake.post);
router.get('/stake', cStake.get);

/// SYNC ROUTES ///
router.post('/sync', cSync.post);
router.get('/sync', cSync.get);

/// INDEX ROUTE ///
router.get('/', (req, res) => {
  res.send('API IS HERE.');
});

app.use('/api', router);

module.exports = functions.https.onRequest(app);