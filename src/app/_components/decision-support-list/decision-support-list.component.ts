/**
 * @whatItDoes It's a table that lists all of the active decision supports, gives links to access them and some basic info about each.
 *
 * @description
 *  It's accessible from the "DecisionSupport" tab.
 * The tables has columns: "ID#, Name, Process Type, Time Created"
 * For each decision supports the following actions are available: Open (done by clicking on the name), Delete (Archives It), Change Name
 */

import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DecisionSupportList } from '../../_classes/decision-support-list';
import { DecisionSupportService } from '../../_services/decision-support.service';
import { NewDecisionSupportDialogComponent } from '../dialog-components/decision-support-dialog/new-decision-support-dialog/new-decision-support-dialog.component';
import { RenameDecisionSupportDialogComponent } from '../dialog-components/decision-support-dialog/rename-decision-support-dialog/rename-decision-support-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UnsavedDecisionSupportAlertDialogComponent } from '../dialog-components/decision-support-dialog/unsaved-decision-support-alert-dialog/unsaved-decision-support-alert-dialog.component';

@Component({
  selector: 'app-decision-support-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatTable, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './decision-support-list.component.html',
  styleUrl: './decision-support-list.component.scss'
})

export class DecisionSupportListComponent {

  decisionSupports: DecisionSupportList[] = []; // Create an array of DecisionSupportList objects.
  response: boolean = false; //boolean value for spinner
  displayedColumns: string[] = ['decisionSupportId', 'name', 'processId', 'createdTime', 'updatedTime', 'actions']; // machine names for the table's columns.

  constructor( private decisionSupportService: DecisionSupportService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getDecisionSupports();
    this.checkUnSavedData();
  }

  // Queries the backend and returns all decision supports.
  getDecisionSupports(): void {
    this.decisionSupportService.getDecisionSupportList().subscribe({
      next: (data) => {this.decisionSupports = data; this.response = true;},
      error: (err) =>{ console.error('Error fetching reports: ', err); this.response = true;}
    });
  }

  checkUnSavedData(): void{
    const unsavedData = localStorage.getItem("decision_support_data");
     if (unsavedData) {
       const formattedData = JSON.parse(unsavedData);
       const dialogRef = this.dialog.open(UnsavedDecisionSupportAlertDialogComponent,{width: '800px', data: {unSavedData: formattedData}});
       dialogRef.afterClosed().subscribe(result =>{
         if(result){
           //If the user want to continue. Navigate the user to the desired page
           this.router.navigate(['/support/', formattedData.entityId]);
         }
       })
     }
   }

  // Opens NewDecisionSupportDialogComponent and then tells the backend to create a new decision support.
  addDecisionSupport(): void {
    const dialogRef = this.dialog.open(NewDecisionSupportDialogComponent, {
      width: '400px'
    });

    // Recieves result from NewDecisionSupportDialogComponent...
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        const formattedData = {
          label: result.name,
          process_id: result.process_id,
          json_string: JSON.stringify({ name: result.name }) 
        }
        // ... and posts it to the backend!
        this.decisionSupportService.postDecisionSupport(formattedData).subscribe({
          next: (response) => {
            console.log('Successfully added decision support: ', formattedData);
            this.getDecisionSupports();
          },
          error: (err) => {
            console.error('Error adding decision support: ', err);
          }
        });
      }
    });
  }

  // Sends an archive request to the backend.
  archiveDecisionSupport(id: string): void {
    this.decisionSupportService.archiveDecisionSupport(id).subscribe({
      next: (response) => {
        this.getDecisionSupports();
      },
      error: (err) => {
        console.error('Error fetching reports: ', err)
      }
    })
  }

  // Submit's a new name for an decision support.
  renameDecisionSupport(id: string): void {
    // Open the rename decision support dialog component
    const dialogRef = this.dialog.open(RenameDecisionSupportDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => { //result = the new name
      if (result) {
        this.decisionSupportService.patchDecisionSupport(id, null).subscribe({  // Need to edit the patch decision support function to accept "name" as a third parameter
          next: (response) => {
            console.log('Successfully renamed decision support: ', result);
            this.getDecisionSupports();
          },
          error: (err) => {
            console.error('Error adding decision support: ', err);
          }
        });
      }
    });
  }
}