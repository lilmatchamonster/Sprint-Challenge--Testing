const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the server', () => {
  
  describe('the environment', () => {
    it('should set testing environment', () => {
      const env = process.env.DB_ENV;

      expect(env).toBe('testing');
    });
  });
 
  describe('GET / Testing', () => {
    it('should return status 200', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
    });

    it('should return JSON', async () => {
      const res = await request(server).get('/');
  
      expect(res.type).toBe('application/json');
    });

    it(`should return { message: 'Welcome, server accessed' }`, async () => {
      const res = await request(server).get('/');

      expect(res.body).toEqual({ message: 'Welcome, server accessed' });
    });
  });

  describe('GET /games Testing', () => {

    beforeEach(() => {
      return db('games').truncate();
    });

    it('should respond with an empty array when there are not any games', async () => {
      const res = await request(server).get('/games');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toEqual([]);
    });

    it('should respond with an array of all the games in the db and a status of 200', async () => {
      await db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      const res = await request(server).get('/games');
      const data = res.body

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(data.length).toEqual(1);
      expect(data[0].id).toBe(1);
      expect(data[0].title).toBe('Pacman');
    });

  });

  describe("POST /games Testing", () => {
    it('should respond with a status of 422 if any required fields are incomplete', async () => {
      const testData = { title: 'Pacman', releaseYear: 1980 };

      const res = await request(server).post('/games').send(testData);

      expect(res.status).toBe(422);
    });

    it('should respond with a status of 201 if game is posted', async () => {
      const res = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 });

      expect(res.status).toEqual(201)

    })

  });

});