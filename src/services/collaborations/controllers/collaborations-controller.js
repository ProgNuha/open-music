import CollaborationsRepository from "../repositories/collaborations-repository.js";
import PlaylistsRepository from "../../playlists/repositories/playlist-repository.js";
import UserRepository from "../../users/repositories/user-repository.js";
// import UserController from "../../users/controllers/user-controller.js";
import { success } from "../../../utils/response.js";

const collaborationsRepository = new CollaborationsRepository();
const playlistsRepository = new PlaylistsRepository();
const userRepository = new UserRepository();

export const addCollaboration = async (req, res, next) => {
  try {
    const { playlistId, userId } = req.validated;
    const { id: credentialId } = req.user;

    await playlistsRepository.verifyPlaylistOwner(playlistId, credentialId);
    await userRepository.getUserById(userId);

    // await UserController.verifyUserExists(userId);
    const collaborationId = await collaborationsRepository.addCollaboration(
      playlistId,
      userId,
    );

    success(res, { collaborationId }, "Kolaborasi berhasil ditambahkan", 201);
  } catch (error) {
    next(error);
  }
};

export const deleteCollaboration = async (req, res, next) => {
  try {
    const { playlistId, userId } = req.validated;
    const { id: credentialId } = req.user;

    await playlistsRepository.verifyPlaylistOwner(playlistId, credentialId);
    await collaborationsRepository.deleteCollaboration(playlistId, userId);

    success(res, null, "Kolaborasi berhasil dihapus");
  } catch (error) {
    next(error);
  }
};
