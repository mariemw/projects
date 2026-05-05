import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../project.interface';
import { Task } from '../task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
   constructor(private http:HttpClient){}

   addTaks(projectId:string,task:Task){
    return this.http.patch<Project>(`http://localhost:3000/project/${projectId}/newTask`,task)
   }

   getTasks(projectId:string){
    return this.http.get<Task[]>(`http://localhost:3000/project/tasks/${projectId}`)
   }

   deleteTask(projectId:string,task:Task){
    return this.http.patch<Project>(`http://localhost:3000/project/${projectId}/deleteTask`,task)
   }
}
