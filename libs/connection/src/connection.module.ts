import { Module } from '@nestjs/common';
import { ConnectionProviders } from './connection.provider';

@Module({
  providers: [...ConnectionProviders],
  exports: [...ConnectionProviders],
})
export class ConnectionModule {}
