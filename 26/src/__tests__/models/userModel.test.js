import { describe, it, expect, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import User from '../../models/userModel.js';
import bcrypt from 'bcrypt';

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('Validaciones de Campos', () => {
    it('debería crear un usuario con datos válidos', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe('juan');
      expect(savedUser.lastName).toBe('pérez');
      expect(savedUser.email).toBe('juan@example.com');
      expect(savedUser.age).toBe(25);
      expect(savedUser.password).not.toBe('Password123'); // Debe estar encriptada
    });

    it('debería fallar sin nombre', async () => {
      const userData = {
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('debería fallar con email inválido', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'email-invalido',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('debería fallar con edad menor a 16', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 15,
        password: 'Password123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('debería fallar con contraseña inválida', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: '123' // Contraseña muy corta
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('Encriptación de Contraseñas', () => {
    it('debería encriptar la contraseña automáticamente', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.password).not.toBe('Password123');
      expect(savedUser.password).toMatch(/^\$2[aby]\$\d+\$/); // Formato bcrypt
    });

    it('debería poder verificar contraseña encriptada', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const isValid = bcrypt.compareSync('Password123', savedUser.password);
      expect(isValid).toBe(true);
    });
  });

  describe('Timestamps', () => {
    it('debería crear timestamps automáticamente', async () => {
      const userData = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });
  });

  describe('Email Único', () => {
    it('debería fallar con email duplicado', async () => {
      const userData1 = {
        name: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        age: 25,
        password: 'Password123'
      };

      const userData2 = {
        name: 'María',
        lastName: 'González',
        email: 'juan@example.com', // Mismo email
        age: 30,
        password: 'Password456'
      };

      const user1 = new User(userData1);
      await user1.save();

      const user2 = new User(userData2);
      await expect(user2.save()).rejects.toThrow();
    });
  });
});
