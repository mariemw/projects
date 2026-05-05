import { Component, OnInit } from '@angular/core';
import { Project } from '../../project.interface';
import { ProjectsService } from '../../services/projects';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-projects',
  imports: [FormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projects:Project[]=[];
  title:string='';
  description:string='';
  creator:string='';
  userName:string='';
  showPopup:boolean=false;
  constructor(private projectService:ProjectsService,private route: ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.creator=userId;
      this.projectService.getProjects(userId).subscribe((data) => {
        this.projects = data;
      });
    }
    this.getUser();
    
  }

  show(){
    this.showPopup=true;
    console.log(this.creator);
    console.log(this.showPopup)
  }

  close(){
    this.showPopup=false;
    console.log(this.showPopup)
  }

  create(){
    if (!this.creator) {
    console.log('creator vide');
    return;
  }
    this.projectService.createProject({title:this.title,description:this.description,creator:this.creator}).subscribe({
      next:(data)=>{
        console.log(data);
        this.projects.push(data);
        this.title = '';
        this.description = '';
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    })
    this.close();
  }

  getUser(){
    return this.projectService.getUser(this.creator).subscribe({
      next:(data)=>{
        this.userName=data.userName;
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    });
  }

  goToProject(projectId:string){
    this.router.navigate(['/board',projectId])
  }

  removeProject(projectId:string){
    return this.projectService.deleteProject(projectId).subscribe({
      next:(data)=>{
        console.log(data);
        this.projects=this.projects.filter((p)=>p._id!==projectId);
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    })
  }
}
