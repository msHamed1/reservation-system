import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forRootAsync({
    useFactory:(configService:ConfigService)=>({
      uri:configService.get("MONGO_DB_URI"),
      user:"root",
      pass:"password",
      dbName:"sleeper"
    }),
    inject:[ConfigService]
  })]
})
export class DatabaseModule {

  static forFeature(models:ModelDefinition[]):DynamicModule{
    return MongooseModule.forFeature(models);
  }
}
