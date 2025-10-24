import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import User from '../../models/userModel.js';
import { findUserByIdAndCheck } from '../../utils/userHelpers.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock de las dependencias
jest.mock('../../models/userModel.js');
jest.mock('../../utils/userHelpers.js');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Importar después de los mocks
import { 
  createUserService, 
  getUsersService, 
  deleteUserService, 
  updateUserService, 
  validateUserService 
} from '../../services/userService.js';

describe('User Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUserService', () => {
    it('debería crear un usuario exitosamente', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const mockUser = {
        save: jest.fn().mockResolvedValue(userData)
      };

      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => mockUser);

      const result = await createUserService(userData);

      expect(User.findOne).toHaveBeenCalledWith({ email: userData.email });
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({ message: "User created" });
    });

    it('debería lanzar error si el usuario ya existe', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const existingUser = { _id: '123', email: 'juan@example.com' };
      User.findOne.mockResolvedValue(existingUser);

      await expect(createUserService(userData)).rejects.toThrow('User with this email aready exists');
    });
  });

  describe('getUsersService', () => {
    it('debería retornar lista de usuarios', async () => {
      const mockUsers = [
        { _id: '1', name: 'Juan', email: 'juan@example.com' },
        { _id: '2', name: 'María', email: 'maria@example.com' }
      ];

      User.find.mockResolvedValue(mockUsers);

      const result = await getUsersService();

      expect(User.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('debería lanzar error si no hay usuarios', async () => {
      User.find.mockResolvedValue([]);

      await expect(getUsersService()).rejects.toThrow('There are no users');
    });
  });

  describe('deleteUserService', () => {
    it('debería eliminar usuario exitosamente', async () => {
      const userId = '123';
      const mockUser = { _id: userId, name: 'Juan' };

      findUserByIdAndCheck.mockResolvedValue(mockUser);
      User.findByIdAndDelete.mockResolvedValue(mockUser);

      const result = await deleteUserService(userId);

      expect(findUserByIdAndCheck).toHaveBeenCalledWith(userId);
      expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ message: "User deleted succesfully" });
    });

    it('debería lanzar error si el usuario no existe', async () => {
      const userId = '123';
      const error = new Error('User not found');
      error.statusCode = 404;

      findUserByIdAndCheck.mockRejectedValue(error);

      await expect(deleteUserService(userId)).rejects.toThrow('User not found');
    });
  });

  describe('updateUserService', () => {
    it('debería actualizar usuario exitosamente', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };
      const mockUser = { _id: userId, name: 'Juan Carlos' };

      findUserByIdAndCheck.mockResolvedValue(mockUser);
      User.findByIdAndUpdate.mockResolvedValue(mockUser);

      const result = await updateUserService(userId, updateData);

      expect(findUserByIdAndCheck).toHaveBeenCalledWith(userId);
      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        { _id: userId },
        updateData,
        { new: true }
      );
      expect(result).toEqual(mockUser);
    });

    it('debería lanzar error si el usuario no existe', async () => {
      const userId = '123';
      const updateData = { name: 'Juan Carlos' };
      const error = new Error('User not found');
      error.statusCode = 404;

      findUserByIdAndCheck.mockRejectedValue(error);

      await expect(updateUserService(userId, updateData)).rejects.toThrow('User not found');
    });
  });

  describe('validateUserService', () => {
    it('debería validar usuario exitosamente', async () => {
      const email = 'juan@example.com';
      const password = 'Password123';
      const mockUser = {
        _id: '123',
        email: 'juan@example.com',
        password: 'hashedPassword'
      };
      const mockToken = 'jwt-token';

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue(mockToken);

      const result = await validateUserService(email, password);

      expect(User.findOne).toHaveBeenCalledWith({ email });
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, mockUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id, userEmail: mockUser.email },
        expect.any(String),
        { expiresIn: "1h" }
      );
      expect(result).toEqual({ message: "Logged in", token: mockToken });
    });

    it('debería lanzar error si faltan campos', async () => {
      await expect(validateUserService('', '')).rejects.toThrow("There's a missing field");
      await expect(validateUserService('juan@example.com', '')).rejects.toThrow("There's a missing field");
      await expect(validateUserService('', 'Password123')).rejects.toThrow("There's a missing field");
    });

    it('debería lanzar error si el usuario no existe', async () => {
      const email = 'juan@example.com';
      const password = 'Password123';

      User.findOne.mockResolvedValue(null);

      await expect(validateUserService(email, password)).rejects.toThrow('User or password are incorrect');
    });

    it('debería lanzar error si la contraseña es incorrecta', async () => {
      const email = 'juan@example.com';
      const password = 'WrongPassword';
      const mockUser = {
        _id: '123',
        email: 'juan@example.com',
        password: 'hashedPassword'
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compareSync.mockReturnValue(false);

      await expect(validateUserService(email, password)).rejects.toThrow('User or password are incorrect');
    });
  });
});
