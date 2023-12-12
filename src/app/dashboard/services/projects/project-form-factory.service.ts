import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../interfaces/projects/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormFactoryService {

  private _formBuilder = inject(FormBuilder);
  private _projectForm = signal<FormGroup>(this._formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    isActive: [true]
  }));

  public projectForm = computed( () => this._projectForm());

  constructor() {
    console.log(this._projectForm())
  }

  populateProjectForm(data: Project){
    this._projectForm().patchValue(data);
  }

  resetValues(){
    this._projectForm().patchValue({
      id: '',
      name: '',
      isActive: true
    });
    this._projectForm().markAsUntouched();
  }
}
