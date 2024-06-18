import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SaleNotesService } from './sale-notes.service';
import { CreateSaleNoteDto } from './dto/create-sale-note.dto';
import { UpdateSaleNoteDto } from './dto/update-sale-note.dto';

@Controller('sale-notes')
export class SaleNotesController {
  constructor(private readonly saleNotesService: SaleNotesService) {}

  @Post()
  create(@Body() createSaleNoteDto: CreateSaleNoteDto, @Req() req: any) {
    return this.saleNotesService.create(createSaleNoteDto, req.user);
  }

  @Get()
  findAll() {
    return this.saleNotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleNotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleNoteDto: UpdateSaleNoteDto) {
    return this.saleNotesService.update(+id, updateSaleNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleNotesService.remove(+id);
  }
}
