import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
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
}