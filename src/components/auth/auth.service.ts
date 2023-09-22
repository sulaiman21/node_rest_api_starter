import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

import { LoginDTO } from "./dto/login.dto";
import AppError from "../../utils/AppError";
import { UsersService } from "../users/users.service";
import { DiscoverEmailResponseDTO } from "./dto/discoverUser.dto";
import { AuthResponseDTO } from "./dto/authResponse.dto";
import { verifyTwoFactor } from "../../libs/otplib";

export class AuthService {
	userService;
	constructor() {
		this.userService = new UsersService();
	}

	async discoverUser(loginDTO: LoginDTO): Promise<DiscoverEmailResponseDTO> {
		try {
			const user = await this.userService.getUserByEmail(loginDTO.email);

			if (!user) {
				throw new AppError(httpStatus.NOT_FOUND, "Not found!");
			}

			const responseObject: DiscoverEmailResponseDTO = {
				id: user.id,
				email: user.email,
				company: null,
				two_factor: false,
			};

			if (user.company) {
				responseObject.company = user.company;

				return responseObject;
			}

			if (user.two_factor_secret) {
				responseObject.two_factor = true;
				return responseObject;
			}

			return responseObject;
		} catch (error) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"Internal server error!"
			);
		}
	}

	async authenticateUserWithPassword(user: LoginDTO): Promise<AuthResponseDTO> {
		try {
			const _user = await this.userService.getUserByEmail(user.email);

			// password checking
			const verifyPassword = await bcrypt.compare(
				user.password,
				_user.password
			);

			if (!verifyPassword) {
				throw new AppError(httpStatus.UNAUTHORIZED, "Invalid!");
			}

			const token = await this.getJWTToken(_user);
			return {
				user: {
					id: _user.id,
					email: _user.email,
					company: _user.company,
				},
				token,
			};
		} catch (error) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				error?.message || "Internal server error"
			);
		}
	}

	// To authenticate user with pin code
	async authenticateUserWithPin(user: LoginDTO): Promise<AuthResponseDTO> {
		try {
			const _user = await this.userService.getUserByEmail(user.email);

			// if two factor is enabled
			const two_factor = verifyTwoFactor(
				_user.two_factor_secret,
				user.two_factor_code
			);
			// verify the two factor
			if (!two_factor) {
				throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
			}

			const token = await this.getJWTToken(_user);

			return {
				user: {
					id: _user.id,
					email: _user.email,
					company: _user.company,
				},
				token,
			};
		} catch (error) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				error?.message || "Internal server error"
			);
		}
	}

	// Authenticate user using sso
	async authenticateuserWithSSO(user: LoginDTO): Promise<AuthResponseDTO> {
		try {
			const _user = await this.userService.getUserByEmail(user.email);

			if (!user) {
				throw new AppError(httpStatus.NOT_FOUND, "Not found!");
			}

			const token = await this.getJWTToken(_user);

			return {
				user: {
					id: _user.id,
					email: _user.email,
					company: _user.company,
				},
				token,
			};
		} catch (error) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				error?.message || "Internal server error"
			);
		}
	}

	private async getJWTToken(payload: any): Promise<string> {
		// generate JWT token
		const token = JWT.sign(
			{ id: payload.id, email: payload.email },
			process.env.JWT_SECRET
		);
		return token;
	}
}
