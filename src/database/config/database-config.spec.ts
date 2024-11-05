import bullConfig from '@/background/queues/bull.config';
import databaseConfig from './database.config';

describe('databaseConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset process.env to its original state before each test
    process.env = { ...originalEnv };
  });

  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(console, 'info').mockImplementation();
  });

  describe('type', () => {
    it('should return the value of DATABASE_TYPE', async () => {
      process.env.DATABASE_TYPE = 'postgres';
      const config = await databaseConfig();

      expect(config.type).toBe('postgres');
    });

    it('should return the empty value when DATABASE_TYPE is an empty', async () => {
      process.env.DATABASE_TYPE = '';
      const config = await databaseConfig();
      expect(config.type).toBe('');
    });

    it('should throw an error when DATABASE_TYPE is not set', async () => {
      delete process.env.DATABASE_TYPE;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('host', () => {
    it('should return the value of DATABASE_HOST', async () => {
      process.env.DATABASE_HOST = 'localhost';
      const config = await databaseConfig();
      expect(config.host).toBe('localhost');
    });

    it('should return the empty value when DATABASE_HOST is an empty', async () => {
      process.env.DATABASE_HOST = '';
      const config = await databaseConfig();
      expect(config.host).toBe('');
    });

    it('should throw an error when DATABASE_HOST is not set', async () => {
      delete process.env.DATABASE_HOST;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('port', () => {
    it('should return the value of DATABASE_PORT', async () => {
      process.env.DATABASE_PORT = '5432';
      const config = await databaseConfig();
      expect(config.port).toBe(5432);
    });

    it('should return 5432 when DATABASE_PORT is an empty', async () => {
      process.env.DATABASE_PORT = '';
      const config = await databaseConfig();
      expect(config.port).toBe(5432);
    });

    it('should throw an error when DATABASE_PORT is not set', async () => {
      delete process.env.DATABASE_PORT;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when DATABASE_PORT is not a number', async () => {
      process.env.DATABASE_PORT = 'invalid';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('name', () => {
    it('should return the value of DATABASE_NAME', async () => {
      process.env.DATABASE_NAME = 'name';
      const config = await databaseConfig();
      expect(config.name).toBe('name');
    });

    it('should return the empty value when DATABASE_NAME is an empty', async () => {
      process.env.DATABASE_NAME = '';
      const config = await databaseConfig();
      expect(config.name).toBe('');
    });

    it('should throw an error when DATABASE_NAME is not set', async () => {
      delete process.env.DATABASE_NAME;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('username', () => {
    it('should return the value of DATABASE_USERNAME', async () => {
      process.env.DATABASE_USERNAME = 'username';
      const config = await databaseConfig();
      expect(config.username).toBe('username');
    });

    it('should return the empty value when DATABASE_USERNAME is an empty', async () => {
      process.env.DATABASE_USERNAME = '';
      const config = await databaseConfig();
      expect(config.username).toBe('');
    });

    it('should throw an error when DATABASE_USERNAME is not set', async () => {
      delete process.env.DATABASE_USERNAME;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('password', () => {
    it('should return the value of DATABASE_PASSWORD', async () => {
      process.env.DATABASE_PASSWORD = 'password';
      const config = await databaseConfig();
      expect(config.password).toBe('password');
    });

    it('should return the empty value when DATABASE_PASSWORD is an empty', async () => {
      process.env.DATABASE_PASSWORD = '';
      const config = await databaseConfig();
      expect(config.password).toBe('');
    });

    it('should throw an error when DATABASE_PASSWORD is not set', async () => {
      delete process.env.DATABASE_PASSWORD;
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });

  describe('logging', () => {
    it('should return the value of DATABASE_LOGGING as a boolean', async () => {
      process.env.DATABASE_LOGGING = 'true';
      const config = await databaseConfig();
      expect(config.logging).toBe(true);
    });

    it('should return false when DATABASE_LOGGING is an empty', async () => {
      process.env.DATABASE_LOGGING = '';
      const config = await databaseConfig();
      expect(config.logging).toBe(false);
    });

    it('should return false when DATABASE_LOGGING is not set', async () => {
      delete process.env.DATABASE_LOGGING;
      const config = await databaseConfig();
      expect(config.logging).toBe(false);
    });

    it('should return false when DATABASE_LOGGING is not a boolean', async () => {
      process.env.DATABASE_LOGGING = 'invalid';
      const config = await databaseConfig();
      expect(config.logging).toBe(false);
    });
  });

  describe('synchronize', () => {
    it('should return the value of DATABASE_SYNCHRONIZE as a boolean', async () => {
      const mode = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      process.env.DATABASE_SYNCHRONIZE = 'true';
      const config = await databaseConfig();
      expect(typeof config.synchronize).toBe('boolean');
      process.env.NODE_ENV = mode;
    });

    it('should return false when DATABASE_SYNCHRONIZE is not set', async () => {
      delete process.env.DATABASE_SYNCHRONIZE;
      const config = await databaseConfig();
      expect(config.synchronize).toBe(false);
    });
  });

  describe('maxConnections', () => {
    it('should return the value of DATABASE_MAX_CONNECTIONS as a number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '10';
      const config = await databaseConfig();
      expect(config.poolSize).toBe(10);
    });

    it('should return 100 when DATABASE_MAX_CONNECTIONS is not set', async () => {
      delete process.env.DATABASE_MAX_CONNECTIONS;
      const config = await databaseConfig();
      expect(config.poolSize).toBe(100);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is an empty', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is not a number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = 'invalid';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });

    it('should throw an error when DATABASE_MAX_CONNECTIONS is a negative number', async () => {
      process.env.DATABASE_MAX_CONNECTIONS = '-10';
      await expect(async () => await databaseConfig()).rejects.toThrow(Error);
    });
  });
});
