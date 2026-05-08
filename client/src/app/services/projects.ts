import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../project.interface';
import { User } from '../user.interface';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http:HttpClient){}
  getProjects(userId:string){
    return this.http.get<Project[]>(`${environment.apiUrl}/project/${userId}`)
  }

  createProject(project:Project){
    return this.http.post<Project>(`${environment.apiUrl}/project/newProject`,project);
  }

  getUser(userId:string){
    return this.http.get<User>(`${environment.apiUrl}/users/${userId}`)
  }

  deleteProject(projectId:string){
    return this.http.delete<string>(`${environment.apiUrl}/project/${projectId}/delete`)
  }
}
