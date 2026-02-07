import PlaylistsRepository from "../repositories/playlist-repository.js";
import SongsRepository from "../../songs/repositories/song-repository.js";
import { success } from "../../../utils/response.js";

const playlistsRepository = new PlaylistsRepository();

export const addPlaylist = async (req, res, next) => {
  try {
    const { name, userId } = req.validated;

    const playlistId = await playlistsRepository.addPlaylist({
      name,
      owner: userId,
    });

    success(res, { playlistId }, "Playlist berhasil ditambahkan", 201);
  } catch (error) {
    next(error);
  }
};

export const getPlaylists = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const playlists = await playlistsRepository.getPlaylists(userId);

    success(res, { playlists });
  } catch (error) {
    next(error);
  }
};

export const deletePlaylistById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await playlistsRepository.verifyPlaylistOwner(id, userId);
    await playlistsRepository.deletePlaylistById(id);

    success(res, null, "Playlist berhasil dihapus");
  } catch (error) {
    next(error);
  }
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { songId, id, userId } = req.validated;

    await playlistsRepository.verifyPlaylistAccess(id, userId);
    await SongsRepository.getSongById(songId);
    await playlistsRepository.addSongToPlaylist(id, songId);
    await playlistsRepository.addActivity({
      playlistId: id,
      songId,
      userId,
      action: "add",
    });

    success(res, null, "Lagu berhasil ditambahkan ke playlist", 201);
  } catch (error) {
    next(error);
  }
};

export const getSongsFromPlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await playlistsRepository.verifyPlaylistAccess(id, userId);
    const playlist = await playlistsRepository.getSongsFromPlaylist(id);

    success(res, { playlist });
  } catch (error) {
    next(error);
  }
};

export const deleteSongFromPlaylist = async (req, res, next) => {
  try {
    const { songId, id, userId } = req.validated;

    await playlistsRepository.verifyPlaylistAccess(id, userId);
    await playlistsRepository.deleteSongFromPlaylist(id, songId);
    await playlistsRepository.addActivity({
      playlistId: id,
      songId,
      userId,
      action: "delete",
    });

    success(res, null, "Lagu berhasil dihapus dari playlist");
  } catch (error) {
    next(error);
  }
};