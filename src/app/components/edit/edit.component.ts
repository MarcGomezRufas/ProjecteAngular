import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  public title: string;
  public projectForm: FormGroup;
  public url: string;
  public status: string = '';
  public fileToUpload: File | null = null;
  public project!: Project;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.title = "Editar Projecte";
    this.url = Global.url;
    this.projectForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      year: [new Date().getFullYear()],
      langs: ['', Validators.required],
      image: [null]
    });
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
          this.projectForm.patchValue({
            name: this.project.name,
            description: this.project.description,
            category: this.project.category,
            year: this.project.year,
            langs: this.project.langs
          });
        }
      },
      error => {
        console.log(error);
        this._router.navigate(['/projects']);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <File>fileInput.target.files[0];
  }

  onSubmit() {
    if (this.projectForm.invalid) {
      return;
    }

    this.project.name = this.projectForm.value.name;
    this.project.description = this.projectForm.value.description;
    this.project.category = this.projectForm.value.category;
    this.project.year = this.projectForm.value.year;
    this.project.langs = this.projectForm.value.langs;

    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          // Upload Image
          if (this.fileToUpload) {
            this._projectService.uploadImage(response.project._id, this.fileToUpload).subscribe(
              result => {
                this.status = 'success';
              },
              error => {
                console.log(error);
                this.status = 'failed';
              }
            );
          } else {
            this.status = 'success';
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

