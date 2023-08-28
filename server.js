const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

// Set up connection for mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Turn debug to true so we can log queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to Moongoose at localhost:${PORT}`));