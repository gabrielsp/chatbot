import mongoose, { Document } from 'mongoose';

export interface IPasswordResetToken extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const passwordResetTokenSchema = new mongoose.Schema<IPasswordResetToken>({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: Date.now, expires: 3600 } // 1 hora
});

export default mongoose.model<IPasswordResetToken>('PasswordResetToken', passwordResetTokenSchema);