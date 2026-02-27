import LikesRepository from "../repositories/likes-repository.js";
import CacheService from "../../redis/CacheService.js";

const likesRepository = new LikesRepository();
const cacheService = new CacheService();

export const postLikeAlbumHandler = async (request, response, next) => {
  try {
    const { id: albumId } = request.params;
    const { id: userId } = request.user;

    await likesRepository.likeAlbum(userId, albumId);
    await cacheService.delete(`album:${albumId}:likes`);

    response.status(201).json({
      status: "success",
      message: "Album berhasil disukai",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLikeAlbumHandler = async (request, response, next) => {
  try {
    const { id: albumId } = request.params;
    const { id: userId } = request.user;

    await likesRepository.unlikeAlbum(userId, albumId);
    await cacheService.delete(`album:${albumId}:likes`);

    response.status(200).json({
      status: "success",
      message: "Like berhasil dibatalkan",
    });
  } catch (error) {
    next(error);
  }
};

export const getAlbumLikesHandler = async (request, response, next) => {
  try {
    const { id: albumId } = request.params;
    const cacheKey = `album:${albumId}:likes`;

    const cachedLikes = await cacheService.get(cacheKey).catch(() => null);

    if (cachedLikes !== null) {
      response.set("X-Data-Source", "cache");
      return response.status(200).json({
        status: "success",
        data: { likes: parseInt(cachedLikes) },
      });
    }

    const likes = await likesRepository.getAlbumLikesCount(albumId);
    await cacheService.set(cacheKey, likes, 1800);

    return response.status(200).json({
      status: "success",
      data: { likes },
    });
  } catch (error) {
    next(error);
  }
};
