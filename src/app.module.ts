import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './modules/users/user.module';
import { DirectiveLocation, GraphQLDirective, GraphQLError } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { TypeOrmConfigService } from './configs/typeorm-config.service';
import { ConfigModule } from '@nestjs/config';
import mysqlConfig from './configs/db.conf';
import { JwtModule } from '@nestjs/jwt';
import { HttpErrorFilter } from './filters/http-error.filter';
import { AppService } from './app.service';
import { FileModule } from './modules/files/file.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'prod'}`,
      load: [mysqlConfig],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      formatError: (error: GraphQLError) => {
        console.log(error);
        const graphQLFormattedError: any = error?.extensions?.originalError || {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
      autoTransformHttpErrors: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    JwtModule.register({}),
    UserModule,
    FileModule,
    VehicleModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    AppService,
  ],
})
export class AppModule {}
