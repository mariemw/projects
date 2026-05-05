import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject:[ConfigService],
      useFactory:async(configService:ConfigService)=>({
        uri:configService.get<string>('MONGODB_URI'),
      }),
    }),
    UserModule,
    ProjectModule
  ],


})
export class AppModule {}
