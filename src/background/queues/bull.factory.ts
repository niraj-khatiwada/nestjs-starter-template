import { AllConfigType } from '@/config/config.type';
import { type BullRootModuleOptions } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import bullConfig from './bull.config';

async function useBullFactory(
  configService: ConfigService<AllConfigType>,
): Promise<BullRootModuleOptions> {
  const config = await bullConfig();
  return {
    prefix: config.prefix,
    defaultJobOptions: config.defaultJobOptions,
    connection: {
      host: configService.getOrThrow('redis.host', {
        infer: true,
      }),
      port: configService.getOrThrow('redis.port', {
        infer: true,
      }),
      password: configService.getOrThrow('redis.password', {
        infer: true,
      }),
      tls: configService.get('redis.tlsEnabled', { infer: true }),
    },
  };
}

export default useBullFactory;
