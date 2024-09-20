import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>, 
        configService: ConfigService
        ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    
    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;

        const user = await this.userRepository.findOne({ where: { id } });

        if(!user) {
            throw new UnauthorizedException("El token no es valido");
        }

        if(!user.active) {
            throw new UnauthorizedException("El usuario no esta inactivo");
        }

        return user
    }
}