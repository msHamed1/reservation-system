import { AbstractRepositiry } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { UserDocument } from "./models/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()

export class UserRepository extends AbstractRepositiry<UserDocument> {
protected readonly   logger: Logger;

constructor(
    @InjectModel(UserDocument.name) userMode: Model<UserDocument>
){
    super(userMode)
}

}