import { Injectable,NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShiftmanagerDto } from './dto/create-shiftmanager.dto';
import { UpdateShiftmanagerDto } from './dto/update-shiftmanager.dto';
import { Shiftmanager } from './entities/shiftmanager.entity';
@Injectable()
export class ShiftmanagerService {
  constructor(
    @InjectRepository(Shiftmanager)
    private readonly managerRepo : Repository<Shiftmanager>
  ){}

  async create(createShiftmanagerDto: CreateShiftmanagerDto):Promise<Shiftmanager> {
    const manager = await this.managerRepo.create(createShiftmanagerDto)
    return await this.managerRepo.save(manager)
  }

  async findAll() :Promise<Shiftmanager[]>{
    const result = await this.managerRepo.find()
    if(!result){
      throw new NotFoundException("No Manager")
    }
    return result
  }

  async findOne(id: number):Promise<Shiftmanager> {
    const result = await this.managerRepo.findOne({where :{id}})
    if(!result){
      throw new NotFoundException("No Manager")
    } 
    return result
  }

  async update(id: number, updateShiftmanagerDto: UpdateShiftmanagerDto):Promise<Shiftmanager> {
    const res = await this.managerRepo.preload({
      id,
      ...updateShiftmanagerDto
    })
    if(!res){
      throw new NotFoundException(`No manager with id ${id} found`)
    }
    
    return await this.managerRepo.save(res)
  }

  async remove(id: number):Promise<void> {
    const result = await this.managerRepo.delete(id)
    if(result.affected==0){
      throw new NotFoundException("No Manager")
    }
 
  }
}
