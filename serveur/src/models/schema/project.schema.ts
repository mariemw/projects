import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Task } from "src/interfaces/task.interface";
import type { User } from "src/interfaces/user.interface";

export type ProjectDocument=Project & Document;

@Schema({timestamps: true})
export class Project{
    @Prop({required:true})
    title:string;

    @Prop({required:true})
    description:string;

    @Prop({required:true})
    creator:string;

    @Prop({default: []})
    members:string[];

    @Prop({default:[]})
    tasks:Task[];

}

export const ProjectSchema=SchemaFactory.createForClass(Project);