type Company = {
  id: number;
  sso: boolean;
  sso_link: string;
};

export class AuthResponseDTO {
  user: {
    id?: number;
    email: string;
    company?: Company;
  };

  token: string;
}
