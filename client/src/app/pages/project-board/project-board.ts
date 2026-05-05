import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.interface';
import { ActivatedRoute, Route } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-project-board',
  imports: [FormsModule],
  templateUrl: './project-board.html',
  styleUrl: './project-board.css',
})
export class ProjectBoard implements OnInit {
  tasks:Task[]=[];
  title:string='';
  description:string='';
  projectId:string='';
  showPopup:boolean=false;
  constructor(private route:ActivatedRoute,private taskService:TaskService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.projectId = id;
      console.log(this.projectId);
    }
    this.taskService.getTasks(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        console.log(this.tasks);
      },
      error: (err) => {
        console.error(err);
      }
    })
    console.log(this.projectId)
  }

  show(){
    this.showPopup=true;
  }

  addTask(projectId:string,title:string,description:string){
    this.taskService.addTaks(projectId,{title:title,description:description}).subscribe({
      next:(data)=>{
        console.log(data);
          this.tasks=data.tasks||[];
          this.title = '';
          this.description = '';
          this.showPopup=false;
        
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    })
  }

  deleteTask(projectId:string,task:Task){
    this.taskService.deleteTask(projectId,task).subscribe({
      next:(data)=>{
        this.tasks=this.tasks.filter((t)=>t.id!==task.id);
      },
      error: (err) => {
        console.error('Message de validation :', err.error.message);
      }
    })
  }
}
