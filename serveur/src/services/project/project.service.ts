import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/interfaces/task.interface';
import { CreateProjectDto } from 'src/models/dto/create-project.dto';
import { UpdateProjectDto } from 'src/models/dto/update-project.dto';
import { Project, ProjectDocument } from 'src/models/schema/project.schema';
import { randomUUID } from 'crypto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name) private projectModel:Model<ProjectDocument>,
    ){}

    async getAllProjects(){
        return await this.projectModel.find();
    }

    async getProjectByUserId(userId:string){
        return await this.projectModel.find({
            $or:[
                {creator:userId},
                {members:userId}
            ]
        })
    }

    async createProject(createProject:CreateProjectDto){
        const newProject=new this.projectModel(createProject);
        return await newProject.save();
    }

    async updateProject(projectId:string,updateProject:UpdateProjectDto){
        return await this.projectModel.findByIdAndUpdate(
            projectId,
            {
                title:updateProject.title,
                description:updateProject.description,
                creator:updateProject.creator,
                members:updateProject.members,
                tasks:updateProject.tasks
            },
            { returnDocument: 'after', upsert: true }
        )
    }

    async deleteProject(projectId:string){
        await this.projectModel.findByIdAndDelete(projectId);
    }

    async addTask(projectId:string,title:string,description:string){
        const project=await this.projectModel.findById(projectId);
        if (!project)
            throw new Error('project not found');
        const existingtask=project.tasks.find((t)=>t.title===title);
        if (existingtask) throw new Error('there is a task with same name');
        project.tasks.push({id:randomUUID(),title:title,description:description,status:"not started"});
        return await project.save();
    }

    async deleteTask(projectId:string,taskId:string){
        const project=await this.projectModel.findById(projectId);
        if (!project)
            throw new Error('project not found');
        project.tasks=project.tasks.filter((t)=>t.id!==taskId);
        return await project.save();
    }

    async updateTask(projectId:string,taskId:string,updatedTask:Task){
        const project=await this.projectModel.findById(projectId);
        if (!project)
            throw new Error('project not found');
        const index=project.tasks.findIndex((t)=>t.id===taskId);
        if (index===-1)
            throw new Error('task not found');
        project.tasks[index]=updatedTask;
        // let taskfound=project.tasks.find((t)=>t.title===tasktitle);
        // if (!taskfound)
        //     throw new Error('task not found');
        // taskfound.title=updatedTask.title;
        // taskfound.description=updatedTask.description;
        // taskfound.deadline=updatedTask.deadline;
        // taskfound.status=updatedTask.status;
        return await project.save();
    }

    async getTasks(projectId:string){
        const project=await this.projectModel.findById(projectId);
        if (!project)
            throw new Error('project not found');
        return project.tasks;
    }

}
