import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project | null = null;
  public status: string = '';

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getProject(id);
    });
  }

  getProject(id: string) {
    this._projectService.getProject(id).subscribe(
      response => {
        if (response.project) {
          this.project = response.project;
        } else {
          this._router.navigate(['/projects']);
        }
      },
      error => {
        console.log(error);
        this._router.navigate(['/projects']);
      }
    );
  }

  deleteProject(id: string) {
    if (confirm("Segur que vols eliminar el projecte?")) {
      this._projectService.deleteProject(id).subscribe(
        response => {
          if (response.project) {
            this._router.navigate(['/projects']);
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

