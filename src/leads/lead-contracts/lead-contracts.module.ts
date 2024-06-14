import { Module } from '@nestjs/common';
import { LeadContractsService } from './lead-contracts.service';
import { LeadContractsController } from './lead-contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadContract } from './entities/lead-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadContract])],
  controllers: [LeadContractsController],
  providers: [LeadContractsService],
  exports: [LeadContractsService]
})
export class LeadContractsModule {}
