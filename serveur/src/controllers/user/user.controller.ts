import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateUserDto } from 'src/models/dto/create-user.dto';
import { LoginUserDto } from 'src/models/dto/login-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get('/')
    async getAllUsers(@Res() res:Response){
        try{
            const users= await this.userService.getAllUsers();
            return res.status(HttpStatus.OK).json(users);
        }
        catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Get('/:id')
    async getUserById(@Param('id') userId,@Res() res:Response){
        const user=await this.userService.getUserById(userId);
        return res.send(user);
    }

    @Post('/login')
    async getUser(@Body() userFound:LoginUserDto,@Res() res:Response){
        try{
            const user=await this.userService.findUser(userFound);
            return res.status(HttpStatus.OK).json(user);
        }
        catch(error){
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
    }

    @Post('/new')
    async createNewUser(@Body() createUserDto:CreateUserDto, @Res() res:Response){
        await this.userService.createUser(createUserDto);
        return { message: 'Utilisateur créé avec succès' };
    }

}
