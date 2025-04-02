import { Controller, Get, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('search')
  async search(
    @Query('companyName') companyName?: string,
    @Query('contactName') contactName?: string,
    @Query('phone') phone?: string,
    @Query('searchTypeCompany') searchTypeCompany?: 'equal'|'start'|'end'|'middle',
    @Query('searchTypeContact') searchTypeContact?: 'equal'|'start'|'end'|'middle',
  ) {
    return this.customersService.findCustomers({
      companyName,
      contactName,
      phone,
      searchTypeCompany,
      searchTypeContact,
    });
  }
}