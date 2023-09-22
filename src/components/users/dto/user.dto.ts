export type CompanyDTO = {
  id: number;
  sso: boolean;
  sso_link: string;
};

export class UserDTO {
  id?: number;
  first_name: string;
  last_name: string;
  company_id: number;
  email: string;
  password: string;
  password_salt: string;
  user_status_id: number;
  role_id: number;
  email_notification: boolean;
  currency_id: number;
  language_id: number;
  job_role: string;
  linkedin_profile: string;
  country_id: number;
  tour: boolean;
  created: Date;
  mobile_number: string;
  office_number: string;
  dashboard_id: number;
  two_factor_secret: string;
  timezone: number;
  employee_id: number;
  editDashboard: boolean;
  locked: boolean;
  wrong_password_count: number;
  new_ticket_email: boolean;
  client_update_ticket_email: boolean;
  organisation_update_ticket_email: boolean;
  work_flow_access_group: string;
  time_zone_id: number;
  is_notification_on_mobile_app: boolean;

  company: CompanyDTO;
}
