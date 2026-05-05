import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { UserController } from 'src/controllers/user/user.controller';
import { User, UserSchema } from 'src/models/schema/user.schema';
import { UserService } from 'src/services/user/user.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),  
    ],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule {}
