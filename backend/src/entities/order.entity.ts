import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity('Orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'OrderID' })
  orderID: number;

  @Column({ name: 'CustomerID', nullable: true })
  customerID: string;

  @Column({ name: 'EmployeeID', nullable: true })
  employeeID: number;

  @Column({ name: 'OrderDate', type: 'datetime', nullable: true })
  orderDate: Date;
}