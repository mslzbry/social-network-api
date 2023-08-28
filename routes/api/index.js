const router = require('express').Router();

// routes
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// allow router to get access to these routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;