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

    if (!result.rows[0]) {
      return null;
    }

    const album = result.rows[0];

    const songsQuery = {
      text: "SELECT id, title, performer FROM songs WHERE album_id = $1",
      values: [id],
    };

    const songsResult = await this.pool.query(songsQuery);
    album.songs = songsResult.rows;

    return album;
  }
  async getAlbumById(id) {
    const query = {
      text: 'SELECT id, name, year, cover_url as "coverUrl" FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0]) {
      return null;
    }

    const album = result.rows[0];

    const songsQuery = {
      text: "SELECT id, title, performer FROM songs WHERE album_id = $1",
      values: [id],
    };

    const songsResult = await this.pool.query(songsQuery);
    album.songs = songsResult.rows;

    return album;
  }

  async getAlbums() {
    const result = await this.pool.query("SELECT * FROM albums");
    return result.rows;
  }

  async editAlbum({ id, name, year }) {
    const updatedAt = new Date().toISOString();

    const currentAlbum = await this.getById(id);
    if (!currentAlbum) {
      return null;
    }

    const finalName = name !== undefined ? name : currentAlbum.name;
    const finalYear = year !== undefined ? year : currentAlbum.year;

    const query = {
      text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id",
      values: [finalName, finalYear, updatedAt, id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async deleteAlbum(id) {
    const query = {
      text: "DELETE FROM albums WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    return result.rows[0];
  }

  async updateAlbumCover(id, coverUrl) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: "UPDATE albums SET cover_url = $1, updated_at = $2 WHERE id = $3 RETURNING id",
      values: [coverUrl, updatedAt, id],
    };

    const result = await this.pool.query(query);
    return result.rows[0];
  }
}

export default new AlbumRepository();
