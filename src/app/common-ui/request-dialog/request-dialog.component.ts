import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Button } from 'primeng/button';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FlightsService } from '../../data/services/flights.service';
import { TicketCategory } from '../../data/dto/flights.type';

@Component({
  selector: 'app-request-dialog',
  standalone: true,
  imports: [
    DialogModule,
    Button,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    InputIconModule,
    IconFieldModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.css'],
})
export class RequestDialogComponent implements OnInit {
  @Input() data?: any;
  @Input() status!: boolean;
  @Output() setStatus = new EventEmitter<boolean>();
  @Output() setRequests = new EventEmitter<TicketCategory[]>();

  flightClassItems = [
    { name: 'Economy', code: 'premium_economy' },
    { name: 'Business', code: 'business' },
    { name: 'First', code: 'first' },
  ];

  dropdownItems = [
    { name: 'Option 1', code: 'Option_1' },
    { name: 'Option 2', code: 'Option_2' },
    { name: 'Option 3', code: 'Option_3' },
  ];

  requestForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private flightsService: FlightsService,
  ) {}

  ngOnInit() {
    this.requestForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      emails: this.fb.array([this.fb.control('', Validators.required)]),
      phones: this.fb.array([this.fb.control('', Validators.required)]),
      marketing_source: ['', Validators.required],
      notes: [''],
      details: this.fb.array([this.createFlightDetailField()]),
    });
  }

  get emails(): FormArray {
    return this.requestForm.get('emails') as FormArray;
  }

  get phones(): FormArray {
    return this.requestForm.get('phones') as FormArray;
  }

  get details(): FormArray {
    return this.requestForm.get('details') as FormArray;
  }

  createFlightDetailField(): FormGroup {
    return this.fb.group({
      iata_from: ['', Validators.required],
      iata_to: ['', Validators.required],
      departure_date: [null, Validators.required],
      flight_class: ['', Validators.required],
      adults: [0, Validators.required],
      child: [0],
      infants: [0],
    });
  }

  addEmail() {
    this.emails.push(this.fb.control('', Validators.required));
  }

  removeEmail(index: number) {
    if (this.emails.length > 1) {
      this.emails.removeAt(index);
    }
  }

  addPhone() {
    this.phones.push(this.fb.control('', Validators.required));
  }

  removePhone(index: number) {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  addFlightDetail() {
    this.details.push(this.createFlightDetailField());
  }

  removeFlightDetail(index: number) {
    if (this.details.length > 1) {
      this.details.removeAt(index);
    }
  }

  hideDialog() {
    this.setStatus.emit(false);
  }

  saveRequest() {
    if (!this.requestForm.valid) {
      this.showError();
      return;
    }
    if (this.requestForm.valid) {
      const payload = this.requestForm.value;
      this.flightsService
        .postFlight({ direction: 'OW', ...payload })
        .subscribe({
          next: () => {
            this.showSuccess()            
            this.hideDialog();
            this.flightsService.getFlights(1, 100).subscribe({
              next: (flights) => {
                this.setRequests.emit(flights.data);
              },
              error: (error) => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to reload flights'});
              }
            });
          },
          error: (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Request failed'});
            console.error('Request failed', error);
          }
        });
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Request has been created',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Please fill required fields',
    });
  }
}
