const Games = require('./gamesModel.js');
const db = require('../data/dbConfig.js');
const request = require('supertest');

describe('The Games Model', () => {

  describe('The insert Fn', () => {
    
    it('should insert a game into the db', async () => {
      const game = await Games.insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });
      
      expect(game.title).toBe('Pacman');
      expect(game.genre).toBe('Arcade');
      expect(game.releaseYear).toBe(1980);
    });

    beforeEach(()=> { //clean up function
      return db('games').truncate();
    });
  });

  describe('The GetAll Fn', () => {
    it('should retrieve games from the db', async () => {
      db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const games = await Games.getAll();

      expect(games.length).toBe(1);
    });

    it('should retrieve all required feilds in each game in the db', async () => {
      db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const games = await Games.getAll();

      expect(games[0].title).toBe('Pacman');
      expect(games[0].genre).toBe('Arcade');
    });
  });

});