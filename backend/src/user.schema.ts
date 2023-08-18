import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  number: string;
  @Prop()
  dob: string;
}

export const userSchema = SchemaFactory.createForClass(User);
