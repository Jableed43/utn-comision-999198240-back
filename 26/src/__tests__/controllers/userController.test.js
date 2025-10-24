import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { 
  createUser, 
  getUsers, 
  deleteUser, 
  updateUser, 
  validate 
} from '../../controllers/userController.js';
import { 
  createUserService, 
  getUsersService, 
  deleteUserService, 
  updateUserService, 
  validateUserService 
} from '../../services/userService.js';

// Mock de los servicios
jest.mock('../../services/userService.js');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('debería crear usuario exitosamente', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };
      req.body = userData;

      const mockResponse = { message: "User created" };
      createUserService.mockResolvedValue(mockResponse);

      await createUser(req, res);

      expect(createUserService).toHaveBeenCalledWith(userData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('debería manejar error del servicio', async () => {
      const userData = { name: 'Juan' };
      req.body = userData;

      const error = new Error('Validation error');
      createUserService.mockRejectedValue(error);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('getUsers', () => {
    it('debería retornar usuarios exitosamente', async () => {
      const mockUsers = [
        { _id: '1', name: 'Juan', email: 'juan@example.com' },
        { _id: '2', name: 'María', email: 'maria@example.com' }
      ];

      getUsersService.mockResolvedValue(mockUsers);

      await getUsers(req, res);

      expect(getUsersService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('debería manejar error 204 (no content)', async () => {
      const error = new Error('There are no users');
      error.statusCode = 204;
      getUsersService.mockRejectedValue(error);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith([]);
    });

    it('debería manejar error interno del servidor', async () => {
      const error = new Error('Database error');
      getUsersService.mockRejectedValue(error);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('deleteUser', () => {
    it('debería eliminar usuario exitosamente', async () => {
      const userId = '123';
      req.params.id = userId;

      const mockResponse = { message: "User deleted succesfully" };
      deleteUserService.mockResolvedValue(mockResponse);

      await deleteUser(req, res);

      expect(deleteUserService).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('debería manejar error 404 (usuario no encontrado)', async () => {
      const userId = '123';
      req.params.id = userId;

      const error = new Error('User not found');
      error.statusCode = 404;
      deleteUserService.mockRejectedValue(error);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const userId = '123';
      req.params.id = userId;

      const error = new Error('Database error');
      deleteUserService.mockRejectedValue(error);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('updateUser', () => {
    it('debería actualizar usuario exitosamente', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };
      req.params.id = userId;
      req.body = updateData;

      const mockUpdatedUser = { _id: userId, name: 'Juan Carlos' };
      updateUserService.mockResolvedValue(mockUpdatedUser);

      await updateUser(req, res);

      expect(updateUserService).toHaveBeenCalledWith(userId, updateData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('debería manejar error 404 (usuario no encontrado)', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };
      req.params.id = userId;
      req.body = updateData;

      const error = new Error('User not found');
      error.statusCode = 404;
      updateUserService.mockRejectedValue(error);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };
      req.params.id = userId;
      req.body = updateData;

      const error = new Error('Database error');
      updateUserService.mockRejectedValue(error);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });

  describe('validate', () => {
    it('debería validar usuario exitosamente', async () => {
      const credentials = {
        email: 'juan@example.com',
        password: 'Password123'
      };
      req.body = credentials;

      const mockResponse = { message: "Logged in", token: "jwt-token" };
      validateUserService.mockResolvedValue(mockResponse);

      await validate(req, res);

      expect(validateUserService).toHaveBeenCalledWith(credentials.email, credentials.password);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('debería manejar error 400 (credenciales inválidas)', async () => {
      const credentials = {
        email: 'juan@example.com',
        password: 'WrongPassword'
      };
      req.body = credentials;

      const error = new Error('User or password are incorrect');
      error.statusCode = 400;
      validateUserService.mockRejectedValue(error);

      await validate(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('debería manejar error interno del servidor', async () => {
      const credentials = {
        email: 'juan@example.com',
        password: 'Password123'
      };
      req.body = credentials;

      const error = new Error('Database error');
      validateUserService.mockRejectedValue(error);

      await validate(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message
      });
    });
  });
});
