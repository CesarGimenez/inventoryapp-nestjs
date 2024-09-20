import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, ...restOfUser } = createUserDto;
    const userWithEmail = await this.findOneByEmail(email);
    if(userWithEmail) {
      throw new ConflictException('Ya existe un usuario con este email');
    }
    const userData = {
      ...restOfUser,
      email: email.toLowerCase().trim(),
      password: await bcrypt.hash(password, 10),
    }
    return this.userRepository.save(userData)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, username } = updateUserDto;
    const userWithSameEmail = await this.findOneByEmail(email);
    const userWithSameUsername = await this.findOneByUsername(username);
    if(userWithSameEmail || userWithSameUsername) {
      throw new ConflictException('Ya existe un usuario con este email o username');
    }
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
