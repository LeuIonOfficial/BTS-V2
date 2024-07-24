import { Component, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RequestDialogComponent } from '../../common-ui/request-dialog/request-dialog.component';
import { TicketCategory } from '../../data/dto/flights.type';
import { FlightsService } from '../../data/services/flights.service';
import { ConvertFlightClassPipe } from '../../pipes/convert-flight-class.pipe';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { Subscription } from 'rxjs';

interface Country {
  name?: string;
  code?: string;
}

interface Representative {
  name?: string;
  image?: string;
}

interface Customer {
  id: number;
  name: string;
  country: Country;
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: Representative;
  balance: number;
}

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    HttpClientModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
    DropdownModule,
    SliderModule,
    ProgressBarModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    RequestDialogComponent,
    ConvertFlightClassPipe,
    FormsModule,
    PaginatorModule,
  ],
})
export class RequestsPageComponent implements OnInit {
  private flightService = inject(FlightsService);
  private subscriptions: Subscription[] = [];

  page = 1;
  perPage = 10;
  totalRecords = 0;
  requests!: TicketCategory[];

  selectedCustomers!: Customer[];

  representatives!: Representative[];

  tableHeaderItems = [
    { field: 'request_created', title: 'Request Created' },
    { field: '', title: 'Lead ID' },
    { field: '', title: 'Customer Name' },
    { field: '', title: 'Trip Type' },
    { field: '', title: 'Request Details' },
    { field: '', title: 'Cabin' },
    { field: 'marketing_type', title: 'Marketing Type' },
    { field: '', title: 'Marketing Campaign' },
    { field: 'agent_name', title: 'Agent Name' },
    { field: '', title: 'Client Email' },
    { field: '', title: 'Client Phone' },
  ];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  productDialog = false;

  ngOnInit() {
    this.setupRepresentatives();
    this.setupStatuses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  setupRepresentatives() {
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];
  }

  setupStatuses() {
    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ];
  }

  fetchRequests() {
    this.loading = true;
    const subscription = this.flightService
      .getFlights(this.page, this.perPage)
      .subscribe({
        next: (data) => {
          this.totalRecords = data.meta.total;
          this.requests = data.data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching requests', err);
          this.loading = false;
        },
      });
    this.subscriptions.push(subscription);
  }

  openNew() {
    this.productDialog = true;
    console.log('open new');
  }

  deleteSelectedProducts() {}

  checkStatus($event: boolean) {
    this.productDialog = $event;
  }

  filter($event: any) {
    console.log('filter', $event);
  }

  setRequests($requests: TicketCategory[]) {
    this.requests = $requests;
  }

  onPageChange($event: any) {
    console.log('onPageChange', $event);
    this.page = $event.first / $event.rows + 1;
    this.perPage = $event.rows;

    console.log('onPageChange', $event);

    this.fetchRequests();
  }
}
