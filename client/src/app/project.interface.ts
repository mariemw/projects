import { Task } from "./task.interface";

export interface Project{
    title:string,
    description:string,
    creator:string,
    members?:string[],
    tasks?:Task[],
    _id?:string
}