import { CompanyDTO } from "../../users/dto/user.dto";

export class DiscoverEmailResponseDTO {
	id: number;
	email: string;
	two_factor?: boolean;
	company?: CompanyDTO;
}
