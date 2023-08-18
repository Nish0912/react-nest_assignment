import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),
    MongooseModule.forFeature([{ name: 'user', schema: userSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
