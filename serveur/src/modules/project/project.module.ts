import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from 'src/controllers/project/project.controller';
import { Project, ProjectSchema } from 'src/models/schema/project.schema';
import { ProjectService } from 'src/services/project/project.service';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Project.name,schema:ProjectSchema}])
    ],
    controllers:[ProjectController],
    providers:[ProjectService],
    exports:[ProjectService]
})
export class ProjectModule {}
