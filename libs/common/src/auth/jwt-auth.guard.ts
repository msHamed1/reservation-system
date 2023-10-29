import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { AUTH_service } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(@Inject(AUTH_service)  readonly acuthClient :ClientProxy ){}

    // this guard will be sitting in front of any public facing  api route that need to verify the token 
    // it will expect to pass a jwt in side http cookie inorder to authenticate the user
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       
        // cookie parser lib will parse the cookie to the request , so any app will use this Guard should have the cookie parser middlware 
        const jwt = context.switchToHttp().getRequest().cookies?.Authentication ||
        context.switchToHttp().getRequest().headers?.authentication;
  
        if(!jwt) return false;

        return this.acuthClient.send<UserDto>('authenticate',{
            Authentication:jwt
        }).pipe(
            tap((res)=>{
                context.switchToHttp().getRequest().user = res
            }),
            map(()=>  true )
        )





    }

}