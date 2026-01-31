import { Pool } from "pg";
import { nanoid } from "nanoid";

class SongRepository {
  constructor() {
    this.pool = new Pool();
  }

  async create({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO songs(id, title, year, genre, performer, duration, album_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id as "songId", title, year, genre, performer, duration, album_id as "albumId", created_at, updated_at',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };
    const result = await this.pool.query(query);
    return result.rows[0];
  }

  async getById(id) {
    const query = {
      text: "SELECT id, title, year, genre, performer, duration, album_id as \"albumId\" FROM songs WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async getSongs({ title, performer }) {
    let query = {
      text: "SELECT id, title, performer FROM songs",
      values: [],
    };

    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (title) {
      conditions.push(`LOWER(title) LIKE $${paramCount}`);
      values.push(`%${title.toLowerCase()}%`);
      paramCount++;
    }

    if (performer) {
      conditions.push(`LOWER(performer) LIKE $${paramCount}`);
      values.push(`%${performer.toLowerCase()}%`);
      paramCount++;
    }

    if (conditions.length > 0) {
      query.text += " WHERE " + conditions.join(" AND ");
      query.values = values;
    }

    const result = await this.pool.query(query);
    return result.rows;
  }
  
  async editSong({ id, title, year, genre, performer, duration, albumId }) {
    const updatedAt = new Date().toISOString();
    
    const currentSong = await this.getById(id);
    if (!currentSong) {
      return null;
    }
    
    const finalTitle = title !== undefined ? title : currentSong.title;
    const finalYear = year !== undefined ? year : currentSong.year;
    const finalGenre = genre !== undefined ? genre : currentSong.genre;
    const finalPerformer = performer !== undefined ? performer : currentSong.performer;
    const finalDuration = duration !== undefined ? duration : currentSong.duration;
    const finalAlbumId = albumId !== undefined ? albumId : currentSong.albumId;
 
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [finalTitle, finalYear, finalGenre, finalPerformer, finalDuration, finalAlbumId, updatedAt, id],
    };
 
    const result = await this.pool.query(query);
    
    return result.rows[0];
  }

  async deleteSong(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
 
    const result = await this.pool.query(query);
 
    return result.rows[0];
  }
}

export default new SongRepository();
