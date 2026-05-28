import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  testService() {
    return 'Testing service';
  }

  saveProject(project: Project): Observable<any> {
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'save-project', params, { headers: headers });
  }

  getProjects(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'projects', { headers: headers });
  }

  getProject(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'project/' + id, { headers: headers });
  }

  deleteProject(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'project/' + id, { headers: headers });
  }

  updateProject(project: Project): Observable<any> {
    const params = JSON.stringify(project);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'project/' + project._id, params, { headers: headers });
  }

  uploadImage(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this._http.post(this.url + 'upload-image/' + id, formData);
  }
}
