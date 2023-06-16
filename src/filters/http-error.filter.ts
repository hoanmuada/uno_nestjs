import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';

@Catch(ApolloError)
export class HttpErrorFilter implements GqlExceptionFilter {
  catch(exception: ApolloError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const errorResponse = {
      message: exception.message,
      code: exception.extensions?.code || 'INTERNAL_SERVER_ERROR',
    };
    context.res.status(500);
    context.res.errorResponse = errorResponse;
    console.log(context.res);
  }
}
