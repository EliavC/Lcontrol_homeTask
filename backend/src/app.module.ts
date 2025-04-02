import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CustomersModule,DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
