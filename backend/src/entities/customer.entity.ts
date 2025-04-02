import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('Customers')  
export class CustomerEntity {
  @PrimaryColumn()
  customerID: string;

  @Column()
  companyName: string;

  @Column()
  contactName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;
}
