import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators';
import { UserTypeEnum } from 'src/types/enums';

const { ADMIN, SUPER, NORMAL } = UserTypeEnum;

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiBody({ type: CreateUserDto })
  @Auth(ADMIN, SUPER)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ADMIN, SUPER)

  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Auth(ADMIN, SUPER)

  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ADMIN, SUPER)

  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ADMIN, SUPER)

  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
