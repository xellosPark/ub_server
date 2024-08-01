import { TypeOrmModuleOptions } from '@nestjs/typeorm';


export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',            // 데이터베이스 유형
  host: 'localhost',        // 데이터베이스 호스트
  port: 3306,               // 데이터베이스 포트
  username: 'root',         // 데이터베이스 사용자명
  password: 'ubisam8877',   // 데이터베이스 비밀번호
  database: 'admin_board',  // 데이터베이스 이름
  entities: [__dirname + '/../**/*.entity.{js,ts}'],  // 엔티티 경로
  synchronize: true,        // 애플리케이션 시작 시 스키마 동기화 여부
  autoLoadEntities: true,
  logging: true,
};


