import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: 'ec2-54-163-97-228.compute-1.amazonaws.com' || 'localhost',
  // port: 5432,
  // username: 'itrzgigzqfahki' || 'postgres',
  // password: 'd6b2b7d54633921717618677575ad0b0ea23e5ece1df83afebf5657265073ca6' || 'postgres',
  // database: 'd2u3gne68rhljb' || 'task-management',
  entityPrefix: 'pl_',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
  logging: true,
  ssl: true,
  url: process.env.DATABASE_URL || 'postgres://itrzgigzqfahki:d6b2b7d54633921717618677575ad0b0ea23e5ece1df83afebf5657265073ca6@ec2-54-163-97-228.compute-1.amazonaws.com:5432/d2u3gne68rhljb',
}