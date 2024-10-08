/**
 * @whatItDoes This Component gives the preview of the process steps.
 * @description
 *  It's accessible from the "Preview" tab.
 *  Each Step will be displayed based on its type.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import { ProcessService } from '../../_services/process.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { Step } from '../../_classes/step';
import { Process } from '../../_classes/process';
import { QuillModule } from 'ngx-quill';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-preview-process-steps',
  standalone: true,
  imports: [CommonModule, MatRadioModule, MatCheckbox, QuillModule, MatProgressSpinnerModule],
  templateUrl: './preview-process-steps.component.html',
  styleUrl: './preview-process-steps.component.scss'
})
export class PreviewProcessStepsComponent {
  /** ID of the process */
  processId: string;
  /** Process Object to store the process details retrieved from the backend */
  processDetails!: Process;
  /** Array to store all process steps retrieved from the backend */
  processSteps: Step[] = [];
  /** Boolean for spinner */
  response: boolean = false;

  constructor(private route: ActivatedRoute,private processService: ProcessService) {
    /** Get and set the process id from the route */
    this.processId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void{
    /** Fetch the process steps when the component loads */
    this.getProcessSteps();
  }

  /** Fetch the available process steps from the backend and update the array objects */
  getProcessSteps(): void{
    this.processService.getProcessSteps(this.processId).subscribe(
      (data) => {
        this.processDetails = data;
        this.processSteps = data.steps;
        // Log the success message
        console.log('Sucessfully Fetched Process Details');
        this.response = true;
      },(error) => {
        // Log any errors encountered while fetching process details
        console.error('Error fetching process details:', error);
        this.response = true;
      }
    )
  }
  
}


