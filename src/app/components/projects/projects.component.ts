import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public url: string;

  constructor(private _projectService: ProjectService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this._projectService.getProjects().subscribe(
      response => {
        if (response.projects) {
          this.projects = response.projects;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
