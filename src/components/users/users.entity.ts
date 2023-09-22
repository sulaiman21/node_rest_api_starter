import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	modelName: "Users",
	tableName: "user", // Table name in the database
	timestamps: false,
})
export class Users extends Model<Users> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: DataType.STRING })
	first_name: string;

	@Column({ type: DataType.STRING })
	last_name: string;

	@Column({ type: DataType.INTEGER })
	company_id: number;

	@Column({ type: DataType.STRING })
	email: string;

	@Column({ type: DataType.STRING })
	password: string;

	@Column({ type: DataType.STRING })
	password_salt: string;

	@Column({ type: DataType.INTEGER })
	user_status_id: number;

	@Column({ type: DataType.INTEGER })
	role_id: number;

	@Column({ type: DataType.BOOLEAN })
	email_notification: boolean;

	@Column({ type: DataType.INTEGER })
	currency_id: number;

	@Column({ type: DataType.INTEGER })
	language_id: number;

	@Column({ type: DataType.STRING })
	job_role: string;

	@Column({ type: DataType.STRING })
	linkedin_profile: string;

	@Column({ type: DataType.INTEGER })
	country_id: number;

	@Column({ type: DataType.BOOLEAN })
	tour: boolean;

	@Column({ type: DataType.DATE })
	created: Date;

	@Column({ type: DataType.STRING })
	mobile_number: string;

	@Column({ type: DataType.STRING })
	office_number: string;

	@Column({ type: DataType.INTEGER })
	dashboard_id: number;

	@Column({ type: DataType.STRING })
	two_factor_secret: string;

	@Column({ type: DataType.INTEGER })
	timezone: number;

	@Column({ type: DataType.INTEGER })
	employee_id: number;

	@Column({ type: DataType.BOOLEAN })
	editDashboard: boolean;

	@Column({ type: DataType.BOOLEAN })
	locked: boolean;

	@Column({ type: DataType.INTEGER })
	wrong_password_count: number;

	@Column({ type: DataType.BOOLEAN })
	new_ticket_email: boolean;

	@Column({ type: DataType.BOOLEAN })
	client_update_ticket_email: boolean;

	@Column({ type: DataType.BOOLEAN })
	organisation_update_ticket_email: boolean;

	@Column({ type: DataType.STRING })
	work_flow_access_group: string;

	@Column({ type: DataType.INTEGER })
	time_zone_id: number;

	@Column({ type: DataType.BOOLEAN })
	is_notification_on_mobile_app: boolean;
}
