import StorageService from "../../storage/StorageService.js";
import AlbumRepository from "../../albums/repositories/album-repository.js";
import InvariantError from "../../../exceptions/invariant-error.js";

export const postUploadCoverHandler = async (req, res, next) => {
  try {
    const file = req.file;
    const { id } = req.params;

    if (!file) {
      throw new InvariantError(
        "Gagal mengunggah cover. Mohon periksa kembali data yang dikirim",
      );
    }

    // Check if album exists
    const album = await AlbumRepository.getAlbumById(id);

    if (!album) {
      throw new InvariantError("Album tidak ditemukan");
    }

    const oldCoverUrl = album.coverUrl;

    const meta = {
      filename: file.originalname,
      headers: {
        "content-type": file.mimetype,
        "content-length": file.size,
      },
    };

    // Upload new cover (pass buffer directly)
    const coverUrl = await StorageService.writeFile(file.buffer, meta);

    // Update album with new cover URL
    await AlbumRepository.updateAlbumCover(id, coverUrl);

    // Delete old cover if exists
    if (oldCoverUrl) {
      try {
        await StorageService.deleteFile(oldCoverUrl);
      } catch (error) {
        console.log("Failed to delete old cover:", error);
      }
    }

    res.status(201).json({
      status: "success",
      message: "Sampul berhasil diunggah",
    });
  } catch (error) {
    next(error);
  }
};