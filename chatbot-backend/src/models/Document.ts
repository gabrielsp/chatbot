import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  filename: string;
  content: string;
  companyId: mongoose.Schema.Types.ObjectId;
  embeddings?: number[];
  uploadedAt: Date;
}

const DocumentSchema = new Schema<IDocument>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  filename: { type: String, required: true },
  content: { type: String, required: true },
  companyId: { type: Schema.Types.ObjectId, ref: 'ChatbotConfig', required: true },
  embeddings: { type: [Number], default: null },
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDocument>('Document', DocumentSchema);