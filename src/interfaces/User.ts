import { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export { User };
