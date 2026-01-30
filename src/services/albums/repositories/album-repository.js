import { Pool } from "pg";
import { nanoid } from "nanoid";

class AlbumRepository {
  constructor() {
    this.pool = new Pool();
  }

  async create({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO albums(id, name, year, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING id as "albumId", name, year, created_at, updated_at',
      values: [id, name, year, createdAt, updatedAt],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getById(id) {
    const query = {
      text: "SELECT * FROM albums WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

    async getAlbums() {
    const result = await this.pool.query('SELECT * FROM albums');
    return result.rows;
  }
  
  async editAlbum({ id, name, year }) {
    const updatedAt = new Date().toISOString();
 
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id],
    };
 
    const result = await this.pool.query(query);
    
    return result.rows[0];
  }

  async deleteAlbum(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };
 
    const result = await this.pool.query(query);
 
    return result.rows[0].id;
  }
}

export default new AlbumRepository();
