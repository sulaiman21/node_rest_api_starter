import httpStatus from "http-status";
import AppError from "../../utils/AppError";
import { CompanyService } from "../company/company.service";
import { UserDTO } from "./dto/user.dto";
import { Users } from "./users.entity";

export class UsersService {
	private companyService;
	constructor() {
		this.companyService = new CompanyService();
	}

	async getUserByEmail(email: string): Promise<UserDTO> {
		try {
			const user = await Users.findOne({
				where: { email },
			});

			if (!user) {
				throw new AppError(httpStatus.NOT_FOUND, "Not found!");
			}

			const company = await this.companyService.getCompanyById(user.company_id);

			const responseObject: UserDTO = {
				...user.dataValues,
				company: null,
			};

			if (company) {
				responseObject.company = {
					id: company.id,
					sso: company.sso,
					sso_link: company.sso_link,
				};
			}

			return responseObject;
		} catch (error) {
			console.log("ERROR ==> ", error);
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"Internal server error!"
			);
		}
	}
}
