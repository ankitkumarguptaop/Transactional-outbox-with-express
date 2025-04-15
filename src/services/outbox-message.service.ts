import { outboxMessageRepository } from "../repositories";
import { Producer } from "../workers/producer";
const producer = new Producer();
export const outboxMessage = async () => {
  try {
    const pendingMessages = await outboxMessageRepository.findAll({
      limit: 10,
      criteria: {
        status: "PENDING",
      },
    });

    if (pendingMessages.length < 0) {
      return "There is No Pending Messages";
    }

    console.log(pendingMessages);

    pendingMessages.map(async (message: any, index) => {
      await producer.publishMessage(
        message.routing_key,
        message.message,
        message.signature
      );

      await outboxMessageRepository.update({
        payload: {
          status: "SENT",
        },
        criteria: {
          id: message.id,
        },
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
  return "Sucessfully send Emails ";
};

outboxMessage();
