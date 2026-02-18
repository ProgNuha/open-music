import PlaylistRepository from "../../playlists/repositories/playlist-repository.js";
import ProducerService from "../../rabbitmq/ProducerService.js";

const playlistRepository = new PlaylistRepository();
const producerService = new ProducerService();

export const postExportPlaylistHandler = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const { targetEmail } = req.body;
    const { id: userId } = req.user;

    await playlistRepository.verifyPlaylistOwner(playlistId, userId);

    const message = {
      playlistId,
      targetEmail,
    };

    await producerService.sendMessage(
      "export:playlists",
      JSON.stringify(message),
    );

    res.status(201).json({
      status: "success",
      message: "Permintaan Anda sedang kami proses",
    });
  } catch (error) {
    next(error);
  }
};