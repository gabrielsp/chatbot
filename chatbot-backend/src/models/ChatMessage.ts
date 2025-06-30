import mongoose, { Document } from 'mongoose';

export interface IChatMessage extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  sessionId: string;
  message: string;
  response: string;
  timestamp: Date;
  resolved: boolean;
  satisfaction?: number; // 1-5
  responseTime?: number; // em milissegundos
}

const chatMessageSchema = new mongoose.Schema<IChatMessage>({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  sessionId: { type: String, required: true },
  message: { type: String, required: true },
  response: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
  satisfaction: { type: Number, min: 1, max: 5 },
  responseTime: { type: Number } // tempo de resposta em ms
});

export default mongoose.model<IChatMessage>('ChatMessage', chatMessageSchema);