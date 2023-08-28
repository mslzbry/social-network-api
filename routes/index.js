const router = require('express').Router();
const apiRoutes = require('./api');

// prepend /api to all routes
router.use('/api', apiRoutes);

// Display 404 if page not found
router.use((req, res) => {
    res.status(404).send('<h1>404 Error</h1>');
});

module.exports = router;