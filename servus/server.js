
const express = require('express');
const bodyParser = require('body-parser');
const Model = require('./model');
const Repository = require('./repository');
const deepCopyOf = require('./util');

const app = express();
const PORT = 8080;

const repository = new Repository();
const model = new Model(repository);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/heroes', (req, res) => {
  const textToSearch = req.query['text-to-search'];
  const heroes = model.readHeroes().filter(hero => hero.name.includes(textToSearch));
  res.status(200).json(deepCopyOf(heroes));
});

app.post('/api/heroes', (req, res) => {
  const newHero = req.body;
  try {
    model.createHero(newHero);
    res.status(200).send(JSON.stringify({}));
  } catch (error) {
    res.status(400).send(JSON.stringify({ error: error.message }));
  }
});

app.delete('/api/heroes', (req, res) => {
  const heroToBeDeleted = req.body.hero;
  const heroes = model.readHeroes();

  if (!heroes.some(hero => hero.name === heroToBeDeleted)) {
    res.status(400).send(JSON.stringify({ error: 'hero-not-found' }));
  } else {
    model.deleteHero(heroToBeDeleted);
    res.status(200).send(JSON.stringify({}));
  }
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
