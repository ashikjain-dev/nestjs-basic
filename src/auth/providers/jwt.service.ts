import { Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import* as config from "@nestjs/config";
import {JwtService} from '@nestjs/jwt'
import {jwtConfig} from '../config/jwt.config'
import { User } from "../../user/user.entity";
export class JWTService{
    private readonly logger:Logger
    constructor(private readonly jwtService:JwtService,@Inject(jwtConfig.KEY)private readonly jwtConfiguration:config.ConfigType<typeof jwtConfig>){
        this.logger=new Logger('JWTService')
    }
    public async generateToken(user:User){
        try {
            const token= this.jwtService.signAsync({id:user.id,email:user.email},{
                secret:this.jwtConfiguration.secret,
                expiresIn:this.jwtConfiguration.signOptions.expiresIn
            })
            return token
        } catch (error) {
            this.logger.error(`error while generating jwt token:${error}`)
            throw new InternalServerErrorException(`Error while creating a token`)
        }
    }
    public async verifyToken(payload:string){
        try {
            const verify=this.jwtService.verify(payload)
            
        } catch (error) {
             this.logger.error(`error while verifying jwt token:${error}`)
            throw new InternalServerErrorException(`Error while verifying a token`)
        }
    }
}