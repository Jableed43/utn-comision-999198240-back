import { describe, it, expect, jest } from '@jest/globals';
import { verifyTokenMiddleware } from '../../middlewares/verifyTokenMiddleware.js';

// Mock de verifyToken
jest.mock('../../utils/verifyToken.js', () => ({
  verifyToken: jest.fn()
}));

import { verifyToken } from '../../utils/verifyToken.js';

describe('verifyTokenMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('debería permitir continuar con token válido', () => {
    const mockDecoded = { userId: '123', userEmail: 'test@example.com' };
    verifyToken.mockReturnValue(mockDecoded);

    req.headers.authorization = 'Bearer valid-token';

    verifyTokenMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith('valid-token');
    expect(req.user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('debería retornar error 400 sin authorization header', () => {
    verifyTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token de acceso no proporcionado'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería retornar error 400 sin Bearer prefix', () => {
    req.headers.authorization = 'InvalidPrefix token';

    verifyTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token de acceso no proporcionado'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería retornar error 400 con token inválido', () => {
    req.headers.authorization = 'Bearer invalid-token';
    verifyToken.mockImplementation(() => {
      throw new Error('Invalid Token');
    });

    verifyTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token de acceso invalido',
      error: 'Invalid Token'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('debería extraer token correctamente del header', () => {
    const mockDecoded = { userId: '123', userEmail: 'test@example.com' };
    verifyToken.mockReturnValue(mockDecoded);

    req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

    verifyTokenMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  });

    it('debería manejar header con espacios extra', () => {
      const mockDecoded = { userId: '123', userEmail: 'test@example.com' };
      verifyToken.mockReturnValue(mockDecoded);

      req.headers.authorization = '  Bearer   valid-token  ';

      verifyTokenMiddleware(req, res, next);

      // El middleware debería fallar porque el token está vacío
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Token de acceso no proporcionado'
      });
      expect(next).not.toHaveBeenCalled();
    });

  it('debería retornar error 400 con token expirado', () => {
    req.headers.authorization = 'Bearer expired-token';
    verifyToken.mockImplementation(() => {
      throw new Error('Token expired');
    });

    verifyTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Token de acceso invalido',
      error: 'Token expired'
    });
  });
});
