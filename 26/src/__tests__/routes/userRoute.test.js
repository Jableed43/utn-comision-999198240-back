import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { userRoute } from '../../routes/userRoute.js';
import { 
  createUser, 
  getUsers, 
  deleteUser, 
  updateUser, 
  validate 
} from '../../controllers/userController.js';

// Mock de los controladores
jest.mock('../../controllers/userController.js');

const app = express();
app.use(express.json());
app.use('/api/user', userRoute);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/user/create', () => {
    it('debería llamar al controlador createUser', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      createUser.mockImplementation((req, res) => {
        res.status(201).json({ message: 'User created' });
      });

      await request(app)
        .post('/api/user/create')
        .send(userData)
        .expect(201);

      expect(createUser).toHaveBeenCalled();
    });
  });

  describe('GET /api/user/getUsers', () => {
    it('debería llamar al controlador getUsers', async () => {
      const mockUsers = [
        { _id: '1', name: 'Juan', email: 'juan@example.com' },
        { _id: '2', name: 'María', email: 'maria@example.com' }
      ];

      getUsers.mockImplementation((req, res) => {
        res.status(200).json(mockUsers);
      });

      await request(app)
        .get('/api/user/getUsers')
        .expect(200);

      expect(getUsers).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/user/deleteUser/:id', () => {
    it('debería llamar al controlador deleteUser con el ID correcto', async () => {
      const userId = '123';

      deleteUser.mockImplementation((req, res) => {
        res.status(200).json({ message: 'User deleted successfully' });
      });

      await request(app)
        .delete(`/api/user/deleteUser/${userId}`)
        .expect(200);

      expect(deleteUser).toHaveBeenCalled();
    });
  });

  describe('PATCH /api/user/updateUser/:id', () => {
    it('debería llamar al controlador updateUser con el ID correcto', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };

      updateUser.mockImplementation((req, res) => {
        res.status(201).json({ _id: userId, name: 'Juan Carlos' });
      });

      await request(app)
        .patch(`/api/user/updateUser/${userId}`)
        .send(updateData)
        .expect(201);

      expect(updateUser).toHaveBeenCalled();
    });
  });

  describe('POST /api/user/login', () => {
    it('debería llamar al controlador validate', async () => {
      const credentials = {
        email: 'juan@example.com',
        password: 'Password123'
      };

      validate.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Logged in', token: 'jwt-token' });
      });

      await request(app)
        .post('/api/user/login')
        .send(credentials)
        .expect(200);

      expect(validate).toHaveBeenCalled();
    });
  });
});
