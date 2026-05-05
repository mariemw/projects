import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../project.interface';
import { User } from '../user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http:HttpClient){}
  getProjects(userId:string){
    return this.http.get<Project[]>(`http://localhost:3000/project/${userId}`)
  }

  createProject(project:Project){
    return this.http.post<Project>(`http://localhost:3000/project/newProject`,project);
  }

  getUser(userId:string){
    return this.http.get<User>(`http://localhost:3000/users/${userId}`)
  }

  deleteProject(projectId:string){
    return this.http.delete<string>(`http://localhost:3000/project/${projectId}/delete`)
  }
}
