import createHttpError from "http-errors";
import { CompanyEntity } from "./company.entity";
import { CompanyDTO } from "./dto/company.dto";
import AppError from "../../utils/AppError";
import httpStatus from "http-status";

export class CompanyService {
	async getCompanyById(id: number): Promise<CompanyDTO> {
		try {
			const company = await CompanyEntity.findOne({ where: { id } });

			if (!company) {
				throw new AppError(httpStatus.NOT_FOUND, "Not found!");
			}

			return company.dataValues;
		} catch (error) {
			throw new AppError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"Internal server error"
			);
		}
	}
}
