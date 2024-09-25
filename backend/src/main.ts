import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as csurf from 'csurf';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ServerExceptionFilter } from './errors/filters/server-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.use(cookieParser());
  // app.use(csurf({ cookie: { sameSite: true } }));
  //
  // app.use((req: any, res: any, next: any) => {
  //   const token = req.csrfToken();
  //   res.cookie('XSRF-TOKEN', token);
  //   res.locals.csrfToken = token;
  //
  //   next();
  // });

  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new ServerExceptionFilter());
  await app.listen(3001);
}
bootstrap()
  .then(() => console.log('Application started successfully'))
  .catch((err) => console.error('Failed to start application', err));
