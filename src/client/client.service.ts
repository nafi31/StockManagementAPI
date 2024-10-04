import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {

  constructor(

    @InjectRepository(Client)
    private readonly clientRepo : Repository<Client>
  ){
  }
  async create(createClientDto: CreateClientDto):Promise<Client> {
    const clientNew  = await this.clientRepo.create(createClientDto);
    return await this.clientRepo.save(clientNew)

  }
  async findAll() : Promise<Client[]>{
    const allClient = await this.clientRepo.find();
    if(!allClient){
      throw new NotFoundException("There are no Clients");
    }
    return allClient;
  }

  async findOne(id: number):Promise<Client> {
    const clientSerarch = await this.clientRepo.findOne({where :{id}})
    if(!clientSerarch){
      throw new NotFoundException(`There are no Clients with id ${id}`);
    }
    return clientSerarch;
    
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    const clientSerarch = await this.clientRepo.findOne({where :{id}})
    if(!clientSerarch){
      throw new NotFoundException(`There are no Clients with id ${id}`);
    }
    clientSerarch.clientName = updateClientDto.clientName;
    await this.clientRepo.save(clientSerarch)
    return clientSerarch;
  }

  async remove(id: number) : Promise<void> {
    const rmClient = await this.clientRepo.findOne({where :{id}});
    if(!rmClient){
      throw new NotFoundException(`There are no Clients with id ${id}`);
    }
    await this.clientRepo.delete(id)
  }
}
