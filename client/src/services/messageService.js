import api from './api';

export const sendMessage = async (messageData) => {
  const { receiver, receiverId, content } = messageData;
  const response = await api.post('/messages', { receiverId: receiverId || receiver, content });
  return response.data;
};

export const getMessages = async (userId) => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};

export const getConversations = async () => {
  const response = await api.get('/messages/conversations');
  return response.data;
};
