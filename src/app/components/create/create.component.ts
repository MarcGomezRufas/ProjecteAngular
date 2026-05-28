import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  public title: string;
  public projectForm: FormGroup;
  public status: string = '';
  public fileToUpload: File | null = null;
  public savedProject: any;

  constructor(private _projectService: ProjectService) {
    this.title = "Crear Projecte";
    this.projectForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      year: new FormControl(new Date().getFullYear()),
      langs: new FormControl('', Validators.required),
      image: new FormControl(null)
    });
  }

  ngOnInit(): void {
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    const newProject = new Project(
      '',
      this.projectForm.value.name,
      this.projectForm.value.description,
      this.projectForm.value.category,
      this.projectForm.value.year,
      this.projectForm.value.langs,
      ''
    );

    this._projectService.saveProject(newProject).subscribe(
      response => {
        if (response.project) {
          if (this.fileToUpload) {
            this._projectService.uploadImage(response.project._id, this.fileToUpload).subscribe(
              result => {
                this.status = 'success';
                this.savedProject = response.project;
                this.projectForm.reset();
                this.fileToUpload = null;
              },
              error => {
                console.log(error);
                this.status = 'failed';
              }
            );
          } else {
            this.status = 'success';
            this.savedProject = response.project;
            this.projectForm.reset();
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(error);
        this.status = 'failed';
      }
    );
  }
}

