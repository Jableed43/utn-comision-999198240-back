import { describe, it, expect, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { findUserByIdAndCheck } from '../../utils/userHelpers.js';
import User from '../../models/userModel.js';

describe('userHelpers', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('findUserByIdAndCheck', () => {
    it('debería retornar usuario cuando existe', async () => {
      // Crear un usuario de prueba
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const result = await findUserByIdAndCheck(savedUser._id.toString());

      expect(result).toBeDefined();
      expect(result._id.toString()).toBe(savedUser._id.toString());
      expect(result.email).toBe('juan@example.com');
    });

    it('debería lanzar error cuando usuario no existe', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      await expect(findUserByIdAndCheck(nonExistentId.toString())).rejects.toThrow('User not found');
    });

    it('debería lanzar error con ID inválido', async () => {
      const invalidId = 'invalid-id';

      await expect(findUserByIdAndCheck(invalidId)).rejects.toThrow();
    });

    it('debería lanzar error con ID vacío', async () => {
      await expect(findUserByIdAndCheck('')).rejects.toThrow();
    });

    it('debería lanzar error con null', async () => {
      await expect(findUserByIdAndCheck(null)).rejects.toThrow();
    });

    it('debería lanzar error con undefined', async () => {
      await expect(findUserByIdAndCheck(undefined)).rejects.toThrow();
    });

    it('debería retornar error con statusCode 404', async () => {
      const nonExistentId = new mongoose.Types.ObjectId();

      try {
        await findUserByIdAndCheck(nonExistentId.toString());
      } catch (error) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('User not found');
      }
    });
  });
});
