import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/index.service'

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class CommonModule {}
