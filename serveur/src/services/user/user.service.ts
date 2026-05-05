import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/models/dto/create-user.dto';
import { LoginUserDto } from 'src/models/dto/login-user.dto';
import { User, UserDocument } from 'src/models/schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>
    ){}

    async getAllUsers(){
        return await this.userModel.find();
    }

    async findUser(userFound:LoginUserDto){
        const user= await this.userModel.findOne({userName:userFound.userName});
        if (!user) {
            throw new NotFoundException('Utilisateur introuvable');
        }
        if (user.password !== userFound.password) {
            throw new UnauthorizedException('Mot de passe invalide');
        }

        return user;
    }

    async getUserById(userId:String){
        return await this.userModel.findById(userId);
    }


    async createUser(createUserDto:CreateUserDto):Promise<void>{
        const existingUser=await this.userModel.findOne({userName:createUserDto.userName});
        if (existingUser){
            throw new ConflictException('Cet utilisateur existe déjà');
        }
        const newUser=new this.userModel(createUserDto);
        await newUser.save();
    }
}
