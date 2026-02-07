import SongRepository from '../repositories/song-repository.js';
import response from "../../../utils/response.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";

export const createSong = async (req, res, next) => {
  const { title, year, genre, performer, duration, albumId } = req.validated;
  const song = await SongRepository.create({
    title,
    year,
    genre,
    performer,
    duration,
    albumId
  });
 
  if (!song) {
    return next(new InvariantError('Lagu gagal ditambahkan'));
  }
 
  return response(res, 201, 'Lagu berhasil ditambahkan', { songId: song.songId });
};

export const getSongs = async (req, res) => {
  const { title, performer } = req.query;
  const songs = await SongRepository.getSongs({ title, performer });
  return response(res, 200, 'Lagu sukses ditampilkan', { songs });
};

export const getSongById = async (req, res, next) => {
  const { id } = req.params;
  const song = await SongRepository.getById(id);
 
  if (!song) {
    return next(new NotFoundError('Lagu tidak ditemukan'));
  }

  return response(res, 200, 'Lagu sukses ditampilkan', { song });
};

export const editSongById = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    year,
    genre,
    performer,
    duration,
    albumId
  } = req.validated;
 
  const song = await SongRepository.editSong({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId
  });
  if (!song) {
    return next(new NotFoundError('Lagu tidak ditemukan'));
  }
  
  return response(res, 200, 'Lagu berhasil diperbarui', { message: 'Lagu berhasil diperbarui' });
};

export const deleteSongById = async (req, res, next) => {
  const { id } = req.params;
  const deletedSong = await SongRepository.deleteSong(id);
 
  if (!deletedSong) {
    return next(new NotFoundError('Lagu tidak ditemukan'));
  }
 
  return response(res, 200, 'Lagu berhasil dihapus', { message: 'Lagu berhasil dihapus' });
};

export const verifySongExists = async (songId) => {
  const song = await SongRepository.getById(songId);
 
  if (!song) {
    throw new NotFoundError('Lagu tidak ditemukan');
  }
 
  return song;
};
