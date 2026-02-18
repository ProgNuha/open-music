import LikesRepository from "../repositories/likes-repository.js";
import CacheService from "../../redis/CacheService.js";

// class LikesController {
//   constructor() {
//     this._likesRepository = new LikesRepository();
//     this._cacheService = new CacheService();
//   }

export const postLikeAlbumHandler = async (request, response, next) => {
  try {
    const { id: albumId } = request.params;
    const { id: userId } = request.user;

    await LikesRepository.likeAlbum(userId, albumId);

    // Delete cache when likes change
    await CacheService.delete(`album:${albumId}:likes`);

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

    await LikesRepository.unlikeAlbum(userId, albumId);

    // Delete cache when likes change
    await CacheService.delete(`album:${albumId}:likes`);

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

    try {
      // Try to get from cache first
      const cachedLikes = await this._cacheService.get(cacheKey);

      response.set("X-Data-Source", "cache");
      return response.status(200).json({
        status: "success",
        data: {
          likes: parseInt(cachedLikes),
        },
      });
    } catch (error) {
      // Cache miss, get from database
      const likes = await this._likesRepository.getAlbumLikesCount(albumId);

      // Store in cache for 30 minutes (1800 seconds)
      await CacheService.set(cacheKey, likes, 1800);

      response.status(200).json({
        status: "success",
        data: {
          error,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
// }

// export default LikesController;
