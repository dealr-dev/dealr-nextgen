import { database } from "../firebase";
import { chatroomAPI } from "../services";

// Subscribe to messages in a chatroom
export function listenToChatroom(testdriveId, onMessages) {
  const ref = database.ref(`chatrooms/${testdriveId}`);
  ref.on("value", snapshot => {
    const dbmessages = snapshot.val();
    if (!dbmessages) {
      onMessages([]);
      return;
    }
    const messages = Object.keys(dbmessages).map(id => ({ ...dbmessages[id], id }));
    onMessages(messages);
  });
  return () => ref.off("value"); // unsubscribe
}

export async function sendBuyerMessage(testdriveId, message) {
  return chatroomAPI.sendMessage(testdriveId, "buyer", message);
}

export async function sendHostMessage(testdriveId, message) {
  return chatroomAPI.sendMessage(testdriveId, "host", message);
}