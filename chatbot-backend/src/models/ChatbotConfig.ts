import mongoose, { Document, Schema } from 'mongoose';

export interface IChatbotConfig extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  phone: string;
  companyName: string;
  welcomeMessage: string;
}

const ChatbotConfigSchema = new Schema<IChatbotConfig>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
    unique: true
  },
  phone: { 
    type: String, 
    required: true,
    set: (value: any): string => value.toString() 
  },
  companyName: { type: String, required: true },
  welcomeMessage: { type: String, default: 'Olá! Como posso ajudar?' },
});

export default mongoose.model<IChatbotConfig>('ChatbotConfig', ChatbotConfigSchema);