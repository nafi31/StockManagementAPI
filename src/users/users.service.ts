import { Injectable , NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo : Repository<User>
  ){}
  async create(createUserDto: CreateUserDto):Promise<User>{
    const usr = await this.userRepo.create(createUserDto);

    return await this.userRepo.save(usr);

  }

  async findAll():Promise<User[]>{
    const getUser = await this.userRepo.find()
    if(!getUser){
      throw new NotFoundException("No users")
    }
    return getUser;
  }

  async findOne(id: number) : Promise<User> {
    const getUser = await this.userRepo.findOne({where:{id}})
    if(!getUser){
      throw new NotFoundException(`No user with id ${id} found`)
    }
    return getUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const usr = await this.userRepo.preload({
      id,
      ...updateUserDto
    })
    if(!usr){
      throw new NotFoundException(`No user with id ${id} found`)
    }
    return await this.userRepo.save(usr)
  }

  async remove(id: number) : Promise<void>{
    const usr = await this.userRepo.delete(id)
    if (usr.affected == 0){
      throw new NotFoundException(`No user with id ${id} found`)
    }
    return;
    
  }
}
