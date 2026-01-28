import AlbumRepository from '../repositories/album-repository.js';
import response from "../../../utils/response.js";
import { InvariantError } from "../../../exceptions/index.js";

export const create = async (req, res, next) => {
  const { name, year } = req.validated;
  const album = await AlbumRepository.create({
    name,
    year
  });
 
  if (!album) {
    return next(new InvariantError('Album gagal ditambahkan'));
  }
 
  return response(res, 201, 'Album berhasil ditambahkan', album);
};