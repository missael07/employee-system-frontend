import { Component, computed, inject, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from 'src/app/dashboard/interfaces/projects/project.interface';
import { ProjectFormFactoryService } from 'src/app/dashboard/services/projects/project-form-factory.service';
import { ProjectService } from 'src/app/dashboard/services/projects/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

public isSaving: boolean = false;

private _project: Project = inject(MAT_DIALOG_DATA);
private _id = signal<string>(this._project._id ?? '');
private _projectFormService = inject(ProjectFormFactoryService);
private _projectService = inject(ProjectService);
private _snackBar = inject(MatSnackBar)

public title = computed( () => this._id() ? 'Edit Project' : 'Add Project' );
public buttonText = computed( () => this._id() ? 'Save' : 'Create' );
public projectForm = computed ( () => this._projectFormService.projectForm());

 /**
  *
  */
 constructor() {
    if(this._id()) {
      this._projectFormService.populateProjectForm(this._project);
    }
 }

 ngOnDestroy(): void {
  this._projectFormService.resetValues();
 }

 save(): void{
  if(this.projectForm().invalid){
    this.projectForm().markAllAsTouched();
    return;
  }
  this.isSaving = true;
  if(this._id()) {
    this._updateProject();
  }
  else {
    this._createProject();
  }
 }

 private _createProject(): void {
  const newProject = {
    name: this.projectForm().get('name')?.value
  };

  this._projectService.createProject(newProject).subscribe( {
    next: (response: Project) => {
      this.openSnackBar('Project created successfully');
      this.isSaving = false;
    },
    error: (err) => {
      this.openSnackBar(err.error.message);
      this.isSaving = false;
    }
  });
 }

 private _updateProject(): void {
  const updatedProject = {
    name: this.projectForm().get('name')?.value,
    isActive: this.projectForm().get('isActive')?.value
  };

  this._projectService.updateProject(this._id(), updatedProject).subscribe( {
    next: (response: Project) => {
      this.openSnackBar('Project saved successfully');
      this.isSaving = false;
    },
    error: (err) => {
      this.openSnackBar(err.error.message);
      this.isSaving = false;
    }
  });
 }
 
 openSnackBar(message: string): void {
  this._snackBar.open(message,'', {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3500
  });
 }

}
