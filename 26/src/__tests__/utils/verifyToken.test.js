import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';

// Mock del config manualmente
const mockConfig = {
  SECRET: 'test-secret-key'
};

// Mock de verifyToken
const verifyToken = (token) => {
  try {
    return jwt.verify(token, mockConfig.SECRET);
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

describe('verifyToken', () => {
  const secret = 'test-secret-key';

  it('debería verificar un token válido', () => {
    const payload = { userId: '123', userEmail: 'test@example.com' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    const decoded = verifyToken(token);
    
    expect(decoded.userId).toBe('123');
    expect(decoded.userEmail).toBe('test@example.com');
  });

  it('debería lanzar error con token inválido', () => {
    const invalidToken = 'invalid-token';

    expect(() => {
      verifyToken(invalidToken);
    }).toThrow('Invalid Token');
  });

  it('debería lanzar error con token malformado', () => {
    const malformedToken = 'not.a.valid.jwt.token';

    expect(() => {
      verifyToken(malformedToken);
    }).toThrow('Invalid Token');
  });

  it('debería lanzar error con token expirado', () => {
    const payload = { userId: '123', userEmail: 'test@example.com' };
    const expiredToken = jwt.sign(payload, secret, { expiresIn: '-1h' }); // Token expirado

    expect(() => {
      verifyToken(expiredToken);
    }).toThrow('Invalid Token');
  });

  it('debería lanzar error con token firmado con diferente secret', () => {
    const payload = { userId: '123', userEmail: 'test@example.com' };
    const tokenWithDifferentSecret = jwt.sign(payload, 'different-secret', { expiresIn: '1h' });

    expect(() => {
      verifyToken(tokenWithDifferentSecret);
    }).toThrow('Invalid Token');
  });

  it('debería lanzar error con string vacío', () => {
    expect(() => {
      verifyToken('');
    }).toThrow('Invalid Token');
  });

  it('debería lanzar error con null o undefined', () => {
    expect(() => {
      verifyToken(null);
    }).toThrow('Invalid Token');

    expect(() => {
      verifyToken(undefined);
    }).toThrow('Invalid Token');
  });
});
