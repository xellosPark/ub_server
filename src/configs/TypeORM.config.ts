import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  // type: 'mysql',            // 데이터베이스 유형
  // host: 'localhost',        // 데이터베이스 호스트
  // port: 3306,               // 데이터베이스 포트
  // username: 'root',         // 데이터베이스 사용자명
  // password: 'ubisam8877',   // 데이터베이스 비밀번호
  // database: 'admin_board',  // 데이터베이스 이름
  // entities: [__dirname + '/../**/*.entity.{js,ts}'],  // 엔티티 경로
  // synchronize: true,        // 애플리케이션 시작 시 스키마 동기화 여부
  // autoLoadEntities: true,   // 엔티티를 자동으로 로드할지 여부
  // logging: true,            // 데이터베이스 작업을 로깅할지 여부
  //////////////////////////////////////////////////////////////////////

  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  autoLoadEntities: true,
  logging: true,
};


