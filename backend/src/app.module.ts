import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
        });
        return {
          store: () => store,
          ttl: 3600,
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          host: configService.get('MAIL_HOST'),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          port: configService.get('MAIL_PORT'),
          auth: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            user: configService.get('MAIL_USER'),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            pass: configService.get('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"Loja Online" <${configService.get('MAIL_FROM')}>`,
        },
      }),
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
