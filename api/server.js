const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ message: 'Welcome, server accessed' });
});

server.get('/games', async (req, res) => {
    const games = await Games.getAll();

    res.status(200).json(games);
});

server.post('/games', async (req, res) => {
  if(!req.body.title || !req.body.genre) {
    res.status(422).json({message: "Unable to complete server request. Missing required field(s)"})
  }
  else{
    const allGames = await Games.getAll();

    res.status(201).json(allGames);
  }

});

module.exports = server;