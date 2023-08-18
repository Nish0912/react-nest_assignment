import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

  async getUser(username: string): Promise<User> {
    let userData = new User();

    try {
      userData = await this.userModel.findOne({ username });
    } catch (err) {
      console.log(err);
    }

    return userData;
  }

  async setUser(user: User) {
    let newUser = await this.userModel.findOne({ username: user.username });

    console.log("userData == ", user)

    console.log("newUser == ", newUser)

    if(newUser == null){
        newUser = new this.userModel(user);
    }
    else{
        newUser.username = user.username;
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.number = user.number;
        newUser.dob = user.dob;
    }

    try {
      await newUser.save();
    } catch (err) {
      console.log(err);
    }
  }
}
