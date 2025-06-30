import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  socialId?: string;
  provider?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  cpf?: string;
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  role: string;
  _id: mongoose.Types.ObjectId;
  birthDate: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  socialId: { type: String },
  provider: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  cep: { type: String },
  street: { type: String },
  number: { type: String },
  complement: { type: String },
  city: { type: String },
  state: { type: String },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'support', 'colaborador', 'atendente', 'professor'], 
    default: 'user' 
  },
  cpf: { 
    type: String, 
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^\d{11}$/.test(v);
      },
      message: (props: any) => `${props.value} não é um CPF válido!`
    }
  },
  birthDate: { type: Date },
});

export default mongoose.model<IUser>('User', userSchema);


