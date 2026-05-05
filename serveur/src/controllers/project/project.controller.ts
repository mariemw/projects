import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { title } from 'process';
import type { Task } from 'src/interfaces/task.interface';
import { CreateProjectDto } from 'src/models/dto/create-project.dto';
import { UpdateProjectDto } from 'src/models/dto/update-project.dto';
import { ProjectService } from 'src/services/project/project.service';
import { UserService } from 'src/services/user/user.service';

@Controller('project')
export class ProjectController {

    constructor(private readonly projectService:ProjectService){}

    @Get()
    async getAllProjects(@Res() res:Response){
        const projects= await this.projectService.getAllProjects();
        return res.status(HttpStatus.OK).json(projects);
    }

    @Get('/:id')
    async getProjectsByUserId(@Param('id') userId,@Res() res:Response){
        const projects=await this.projectService.getProjectByUserId(userId);
        return res.status(HttpStatus.OK).json(projects);
    }

    @Post('/newProject')
    async createProject(@Body() createProject:CreateProjectDto,@Res() res:Response){
        const project=await this.projectService.createProject(createProject);
        return res.status(HttpStatus.OK).json(project);
    }

    @Patch('/:id/update')
    async updateProject(@Param('id') id:string,@Body() updateProject:UpdateProjectDto,@Res() res:Response){
        const updatedProject=await this.projectService.updateProject(id,updateProject);
        return res.status(HttpStatus.OK).json(updatedProject);
    }

    @Patch('/:id/newTask')
    async addTask(@Param('id') id:string,@Body()task:Task,@Res() res:Response){
        const project=await this.projectService.addTask(id,task.title,task.description);
        return res.json(project);
    }

    @Patch('/:id/deleteTask')
    async deleteTask(@Param('id') id:string,@Body()task:Task,@Res() res:Response){
        const project=await this.projectService.deleteTask(id,task.id);
        return res.json(project);
    }

    @Delete('/:id/delete')
    async deleteProject(@Param('id') projectId:string,@Res() res:Response){
        await this.projectService.deleteProject(projectId);
        return res.status(HttpStatus.OK).json( 'Project deleted' );;
    }

    @Get('/tasks/:id')
    async getTasks(@Param('id') projectId:string,@Res() res:Response){
        const tasks=await this.projectService.getTasks(projectId);
        return res.json(tasks);
    }

}
