import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ormConfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { BusinessTypesModule } from './business-types/business-types.module';
import { StatesModule } from './states/states.module';
import { StatusesModule } from './statuses/statuses.module';
import { DispositionsModule } from './dispositions/dispositions.module';
import { LeadsModule } from './leads/leads.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig as TypeOrmModuleOptions),
    TypeOrmModule.forFeature(),
    UsersModule,
    AuthModule,
    BusinessTypesModule,
    StatesModule,
    StatusesModule,
    DispositionsModule,
    LeadsModule,
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
