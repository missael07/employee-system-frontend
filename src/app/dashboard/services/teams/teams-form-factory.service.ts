import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../interfaces/teams/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsFormFactoryService {

  private _formBuilder = inject(FormBuilder);
  private _teamForm = signal<FormGroup>(this._formBuilder.group({
    teamName: ['', Validators.required],
    projectId: ['', Validators.required],
    isActive: [true]
  }));

  public teamForm = computed( () => this._teamForm());

  populateTeamForm(data: Team){
    this._teamForm().patchValue({
      teamName: data.teamName,
      projectId: data.projectId?._id,
      isActive: data.isActive
    });
  }

  resetValues(){
    this._teamForm().patchValue({
      teamName: '',
      projectId: '',
      isActive: true
    });
    this._teamForm().markAsUntouched();
  }

}
