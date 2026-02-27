import UsersRepository from '../repositories/user-repository.js';
import { success } from '../../../utils/response.js';
import { NotFoundError } from "../../../exceptions/index.js";


const usersRepository = new UsersRepository();

export const addUser = async (request, response, next) => {
  try {
    const { username, password, fullname } = request.body;

    const userId = await usersRepository.addUser({ username, password, fullname });

    success(response, { userId }, 'User berhasil ditambahkan', 201);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (request, response, next) => {
  try {
    const { id } = request.params;
    const user = await usersRepository.getUserById(id);

    success(response, { user }, 'User ditemukan', 200);
  } catch (error) {
    next(error);
  }
};

export const verifyUserExists = async (userId) => {
  const user = await usersRepository.getById(userId);
  if (!user) {
    throw new NotFoundError('User tidak ditemukan');
  }
  return user;
};


// const UserController = {
//   addUser: async (req, res, next) => {
//     try {
//       const { username, password, fullname } = req.body;

//       const userId = await usersRepository.addUser({ username, password, fullname });

//       success(res, { userId }, 'User berhasil ditambahkan', 201);
//     } catch (error) {
//       next(error);
//     }
//   },

//   getUserById: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const user = await usersRepository.getUserById(id);

//       success(res, { user }, 'User ditemukan', 200);
//     } catch (error) {
//       next(error);
//     }
//   },

//   verifyUserExists: async (userId) => {
//     const user = await usersRepository.getById(userId);
  
//     if (!user) {
//       throw new NotFoundError('User tidak ditemukan');
//     }
  
//     return user;
//   },
// };

// export default UserController;
