import { Component, computed, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/dashboard/interfaces/projects/project.interface';
import { Team } from 'src/app/dashboard/interfaces/teams/team.interface';
import { ProjectService } from 'src/app/dashboard/services/projects/project.service';
import { TeamsFormFactoryService } from 'src/app/dashboard/services/teams/teams-form-factory.service';
import { TeamsService } from 'src/app/dashboard/services/teams/teams.service';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent {

  
public isSaving: boolean = false;

private _team: Team = inject(MAT_DIALOG_DATA);
private _id = signal<string>(this._team._id ?? '');
private _teamFormService = inject(TeamsFormFactoryService);
private _teamService = inject(TeamsService);
private _snackbarService = inject(SnackbarService)
private _projectService = inject(ProjectService);

public title = computed( () => this._id() ? 'Edit Team' : 'Add Team' );
public buttonText = computed( () => this._id() ? 'Save' : 'Create' );
public teamForm = computed ( () => this._teamFormService.teamForm());
public projectList = signal<Project[]>([]);

 /**
  *
  */
 constructor() {
    if(this._id()) {
      this._teamFormService.populateTeamForm(this._team);
    }

    this._getProjects();
 }

 ngOnDestroy(): void {
  this._teamFormService.resetValues();
 }

 save(): void{
  if(this.teamForm().invalid){
    this.teamForm().markAllAsTouched();
    return;
  }
  this.isSaving = true;
  if(this._id()) {
    this._updateTeam();
  }
  else {
    this._createTeam();
  }
 }

 private _getProjects(){
  this._projectService.getAllProjects().subscribe({
    next: (response: Project[]) => {
      this.projectList.set(response);
    }
  });
 }

 private _createTeam(): void {
  const newTeam = {
    teamName: this.teamForm().get('teamName')?.value,
    projectId: this.teamForm().get('projectId')?.value
  };

  this._teamService.createTeam(newTeam).subscribe( {
    next: (response: Team) => {
      this._snackbarService.openSnackBar('Team created successfully');
      this._id.set(response._id!);
      this.isSaving = false;
    },
    error: (err) => {
      this._snackbarService.openSnackBar(err.error.message);
      this.isSaving = false;
    }
  });
 }

 private _updateTeam(): void {
  const updatedTeam = {
    teamName: this.teamForm().get('teamName')?.value,
    projectId: this.teamForm().get('projectId')?.value,
    isActive: this.teamForm().get('isActive')?.value
  };

  this._teamService.updateTeam(this._id(), updatedTeam).subscribe( {
    next: (response: Team) => {
      this._snackbarService.openSnackBar('Team saved successfully');
      this.isSaving = false;
    },
    error: (err) => {
      this._snackbarService.openSnackBar(err.error.message);
      this.isSaving = false;
    }
  });
 }

}
