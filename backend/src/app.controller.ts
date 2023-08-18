import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
    getHello(): {status: string, message: string} {
        return {
            status: 'success',
            message: 'Please run on your localhost'
        }
    }

    @Post('/get-user')
    async getUser(@Body() data: {username: string}) {
        let userData: User;

        try{
            userData = await this.appService.getUser(data.username);
        }
        catch(err){
            console.log(err);

            return {
                status: 'failed'
            }
        }
        return {
            status: 'success',
            data: userData
        }
    }

    @Post('/set-user')
    async setUser(@Body() data: User) {
        console.log("data ==== ", data)
        try{
            await this.appService.setUser(data);
        }
        catch(err){
            console.log(err);

            return {
                status: 'failed'
            }
        }

        return {
            status: 'success'
        }
    }
}
