import axios from 'axios';
import config from '../config/env';
import logger from '../utils/logger';

export const sendToChatbot = async (message: string, userId?: string) => {
  try {
    const response = await axios.post(`${config.CHATBOT_API_URL}/chat`, {
      user_id: userId,
      message
    });
    return response.data;
  } catch (error) {
    logger.error('Erro ao enviar para chatbot Python:', error);
    throw new Error('Erro na comunicação com o chatbot');
  }
};