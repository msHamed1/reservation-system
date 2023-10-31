import { CanActivate, ExecutionContext, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { AUTH_service } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(@Inject(AUTH_service)  readonly acuthClient :ClientProxy ,
    private readonly reflector : Reflector
    ){}

    // this guard will be sitting in front of any public facing  api route that need to verify the token 
    // it will expect to pass a jwt in side http cookie inorder to authenticate the user
    async canActivate(context: ExecutionContext): Promise<any> {
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication ||
            context.switchToHttp().getRequest().headers?.authentication;

        if (!jwt) {
            throw new UnauthorizedException('JWT not provided');
        }

        const roles = this.reflector.getAllAndOverride<string[]>('roles',[
            context.getHandler(),
      context.getClass(),
        ])
        console.log(roles)

        try {
            const user = await this.acuthClient.send<UserDto>('authenticate', { Authentication: jwt }).toPromise();

            if (user) {
            for (const role of roles) {
                if(!user?.roles?.includes(role)){
                    throw new UnauthorizedException('Unauthorized Action for roles');
                }
            }
                context.switchToHttp().getRequest().user = user;
                return true;
            } else {
                throw new UnauthorizedException('Invalid JWT');
            }
        } catch (error) {
            // Handle the error here, you can log it for debugging or return an error response.
            throw new InternalServerErrorException('Authentication failed', error.message);
        }
    }
}