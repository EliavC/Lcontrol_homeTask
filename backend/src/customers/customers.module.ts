import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from '../entities/customer.entity'; 
import { OrderEntity } from 'src/entities/order.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerEntity,OrderEntity]) // use the entity
      ],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
