import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { OrderEntity } from 'src/entities/order.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepo: Repository<CustomerEntity>,

    @InjectRepository(OrderEntity)
    private readonly ordersRepo: Repository<OrderEntity>,
  ) {}

 
  private isMiddleMatchStrict(full: string, val: string): boolean {
    if (!full || !val) return false;

    const lowerFull = full.toLowerCase();
    const lowerVal = val.toLowerCase();
    const maxStart = lowerFull.length - lowerVal.length;
    const middle = Math.floor(maxStart / 2);
    const minRange = Math.max(0, middle - 1);
    const maxRange = Math.min(maxStart, middle + 1);

    let index = lowerFull.indexOf(lowerVal);
    while (index !== -1) {
      if (index >= minRange && index <= maxRange) {
        return true;
      }
      index = lowerFull.indexOf(lowerVal, index + 1);
    }

    return false;
  }

  async findCustomers(options: {
    companyName?: string;
    contactName?: string;
    phone?: string;
    searchTypeCompany?: 'equal' | 'start' | 'end' | 'middle';
    searchTypeContact?: 'equal' | 'start' | 'end' | 'middle';
  }) {
    const {
      companyName,
      contactName,
      phone,
      searchTypeCompany = 'middle',
      searchTypeContact = 'middle',
    } = options;

    const qb = this.customersRepo
      .createQueryBuilder('c')
      .leftJoin(OrderEntity, 'o', 'o.customerID = c.customerID')
      .addSelect('COUNT(o.orderID)', 'totalOrders')
      .groupBy('c.customerID')
      .addGroupBy('c.companyName')
      .addGroupBy('c.contactName')
      .addGroupBy('c.phone')
      .addGroupBy('c.address');


    if (companyName && searchTypeCompany !== 'middle') {
      switch (searchTypeCompany) {
        case 'equal':
          qb.andWhere('c.companyName = :companyName', { companyName });
          break;
        case 'start':
          qb.andWhere('c.companyName LIKE :companyName', {
            companyName: `${companyName}%`,
          });
          break;
        case 'end':
          qb.andWhere('c.companyName LIKE :companyName', {
            companyName: `%${companyName}`,
          });
          break;
      }
    } else if (companyName && searchTypeCompany === 'middle') {
      qb.andWhere('c.companyName LIKE :companyNameLike', {
        companyNameLike: `%${companyName}%`,
      });
    }

    if (contactName && searchTypeContact !== 'middle') {
      switch (searchTypeContact) {
        case 'equal':
          qb.andWhere('c.contactName = :contactName', { contactName });
          break;
        case 'start':
          qb.andWhere('c.contactName LIKE :contactName', {
            contactName: `${contactName}%`,
          });
          break;
        case 'end':
          qb.andWhere('c.contactName LIKE :contactName', {
            contactName: `%${contactName}`,
          });
          break;
      }
    } else if (contactName && searchTypeContact === 'middle') {
      qb.andWhere('c.contactName LIKE :contactNameLike', {
        contactNameLike: `%${contactName}%`,
      });
    }
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      qb.andWhere(
        "REPLACE(REPLACE(REPLACE(REPLACE(c.phone, '(', ''), ')', ''), '-', ''), ' ', '') LIKE :phone",
        { phone: `%${cleanPhone}%` },
      );
    }

    qb.orderBy('c.companyName', 'ASC');

    const rawData = await qb.getRawMany();

    const result = rawData
      .map((row) => ({
        customerID: row.c_customerID,
        companyName: row.c_companyName,
        contactName: row.c_contactName,
        phone: row.c_phone,
        address: row.c_address,
        totalOrders: Number(row.totalOrders || 0),
      }))
      .filter((row) => {
        const companyOk =
          !companyName ||
          searchTypeCompany !== 'middle' ||
          this.isMiddleMatchStrict(row.companyName, companyName);

        const contactOk =
          !contactName ||
          searchTypeContact !== 'middle' ||
          this.isMiddleMatchStrict(row.contactName, contactName);

        return companyOk && contactOk;
      });

    return result;
  }
}
