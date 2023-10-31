export interface UserDto {
    _id     :string;
    email   :string;
    password:string;
    user_name:string;
    roles?:string[]
}