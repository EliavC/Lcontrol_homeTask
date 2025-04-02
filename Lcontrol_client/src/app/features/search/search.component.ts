import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  companyName = '';
  contactName = '';
  phone = '';
  searchTypeCompany: 'equal'|'start'|'end'|'middle' = 'middle';
  searchTypeContact: 'equal'|'start'|'end'|'middle' = 'middle';

  results: any[] = [];

  constructor(private customersService: CustomersService) {}

  doSearch() {
    this.customersService.searchCustomers({
      companyName: this.companyName,
      contactName: this.contactName,
      phone: this.phone,
      searchTypeCompany: this.searchTypeCompany,
      searchTypeContact: this.searchTypeContact
    }).subscribe({
      next: (data) => {
        this.results = data;
      },
      error: (err) => {
        console.error('Error searching customers:', err);
      }
    });
  }
}