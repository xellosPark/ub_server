import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/TypeORM.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig),
     BoardsModule,
     AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
