import { inboxMessageRepository } from "../repositories";

export const inBoxMessage = async (message: any) => {
  const isMessageAlredySended = await inboxMessageRepository.findOne({
    message_id: message.id,
  });

  if (isMessageAlredySended) {
    return true ;
  }
  await inboxMessageRepository.create({
    message_id: message.id,
    type: "Email",
  });

  return false;
};
