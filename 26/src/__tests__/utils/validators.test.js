import { describe, it, expect } from '@jest/globals';
import { isGoodPassword } from '../../utils/validators.js';

describe('Validators', () => {
  describe('isGoodPassword', () => {
    it('debería retornar true para contraseñas válidas', () => {
      const validPasswords = [
        'Password1',
        'MyPass123',
        'Test123',
        'ValidPass1',
        'StrongP@ss1'
      ];

      validPasswords.forEach(password => {
        expect(isGoodPassword(password)).toBe(true);
      });
    });

    it('debería retornar false para contraseñas inválidas', () => {
      const invalidPasswords = [
        'password', // Sin mayúscula ni número
        'PASSWORD', // Sin minúscula ni número
        '123456', // Sin letras
        'Pass', // Muy corta
        'ThisIsAVeryLongPassword123', // Muy larga
        'pass1', // Sin mayúscula
        'PASS1', // Sin minúscula
        'Password', // Sin número
        '', // Vacía
        '123', // Muy corta y sin letras
        'abc', // Muy corta y sin números
        'ABC', // Muy corta y sin números
      ];

      invalidPasswords.forEach(password => {
        expect(isGoodPassword(password)).toBe(false);
      });
    });

    it('debería validar longitud correctamente', () => {
      expect(isGoodPassword('Pass1')).toBe(false); // 5 caracteres
      expect(isGoodPassword('Password123')).toBe(true); // 12 caracteres
      expect(isGoodPassword('Password12345')).toBe(false); // 13 caracteres
    });

    it('debería validar presencia de números', () => {
      expect(isGoodPassword('Password')).toBe(false); // Sin números
      expect(isGoodPassword('Password1')).toBe(true); // Con números
    });

    it('debería validar presencia de mayúsculas', () => {
      expect(isGoodPassword('password1')).toBe(false); // Sin mayúsculas
      expect(isGoodPassword('Password1')).toBe(true); // Con mayúsculas
    });

    it('debería validar presencia de minúsculas', () => {
      expect(isGoodPassword('PASSWORD1')).toBe(false); // Sin minúsculas
      expect(isGoodPassword('Password1')).toBe(true); // Con minúsculas
    });
  });
});
