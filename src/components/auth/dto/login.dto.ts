import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
	@IsEmail()
	email: string;

	@IsString()
	two_factor_code?: string;

	@IsString()
	password?: string;
}
