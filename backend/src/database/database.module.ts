import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mssql',
        host: config.get<string>('DB_HOST')|| 'localhost',
        port: parseInt(config.get<string>('DB_PORT')|| '1433', 10),
        username: config.get<string>('DB_USER')||'sa',
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        options: {
          trustServerCertificate: true,
        },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false, 
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
