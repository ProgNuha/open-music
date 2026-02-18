import AlbumRepository from "../repositories/album-repository.js";
import response from "../../../utils/response.js";
import { InvariantError, NotFoundError } from "../../../exceptions/index.js";

export const createAlbum = async (req, res, next) => {
  const { name, year } = req.validated;
  const album = await AlbumRepository.create({
    name,
    year,
  });

  if (!album) {
    return next(new InvariantError("Album gagal ditambahkan"));
  }

  return response(res, 201, "Album berhasil ditambahkan", {
    albumId: album.albumId,
  });
};

export const getAlbums = async (req, res) => {
  const albums = await AlbumRepository.getAlbums();
  return response(res, 200, "Album sukses ditampilkan", { albums });
};

export const getAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const album = await AlbumRepository.getAlbumById(id);

  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Album sukses ditampilkan", { album });
};

export const editAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const { name, year } = req.validated;

  const album = await AlbumRepository.editAlbum({
    id,
    name,
    year,
  });
  if (!album) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Album berhasil diperbarui", {
    message: "Album berhasil diperbarui",
  });
};

export const deleteAlbumById = async (req, res, next) => {
  const { id } = req.params;
  const deletedAlbum = await AlbumRepository.deleteAlbum(id);

  if (!deletedAlbum) {
    return next(new NotFoundError("Album tidak ditemukan"));
  }

  return response(res, 200, "Album berhasil dihapus", {
    message: "Album berhasil dihapus",
  });
};
