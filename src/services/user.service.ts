import { ForBidden } from "../libs/errors";
import { userRepository } from "../repositories";

export const deleteUser = async (payload: any) => {
  const { id } = payload.user;
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw new ForBidden("User not found");
  }

  return await userRepository.softDelete({
    criteria: { id: id },
    options: { returning: true },
  });
};

export const updateUser = async (payload: any) => {
  const { id } = payload.user;
  const user = await userRepository.findOne({ id: id });
  if (!user) {
    throw new ForBidden("User not found");
  }
  return await userRepository.update({
    payload: payload.body,
    criteria: { id: id },
    options: { returning: true },
  });
};
