import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractorService } from './contractor.service';
import { CreateContractorDto, UpdateContractorDto } from './dto/contractor.dto';

@Controller('contractors')
export class ContractorController {
  constructor(private readonly contractorService: ContractorService) {}

  @Post()
  create(@Body() createContractorDto: CreateContractorDto) {
    return this.contractorService.create(createContractorDto);
  }

  @Get()
  findAll() {
    return this.contractorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractorDto: UpdateContractorDto) {
    return this.contractorService.update(id, updateContractorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractorService.remove(id);
  }
}
