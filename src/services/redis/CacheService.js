import redis from 'redis';

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        // eslint-disable-next-line no-undef
        host: process.env.REDIS_SERVER,
      },
    });

    this._client.on('error', (error) => {
      console.error('Redis error:', error);
    });

    this._connected = this._client.connect(); 
  }

  async connect() {            
    await this._connected;
  }

  async set(key, value, expirationInSecond = 1800) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result === null) {
      throw new Error('Cache not found');
    }
    return result;
  }

  async delete(key) {
    return this._client.del(key);
  }
}

export default CacheService;