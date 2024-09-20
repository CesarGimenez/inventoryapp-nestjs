import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserTypeEnum } from "src/types/enums";

export class CreateUserDto {
    @ApiProperty({
        description: 'El nombre del usuario',
        example: 'Jorge',
    })
    @IsString({ message: 'El nombre debe ser un string' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @ApiProperty({
        description: 'El email del usuario',
        example: 'jorge@mail.com',
    })
    @IsNotEmpty({ message: 'El email es requerido' })
    @IsString({ message: 'El email debe ser un string' })
    @IsEmail({}, { message: 'El email debe ser un email válido' })
    email: string;

    @ApiProperty({
        description: 'La contraseña del usuario',
        example: '123456',
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser un string' })
    password: string;

    @ApiProperty({
        description: 'El tipo de usuario',
        example: UserTypeEnum.NORMAL,
    })
    @IsNotEmpty({ message: 'El tipo de usuario es requerido' })
    @IsString({ message: 'El tipo de usuario debe ser un string' })
    type: UserTypeEnum
    
    username?: string;

    active?: boolean;
}
