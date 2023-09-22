import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
	modelName: "company",
	tableName: "company",
	timestamps: false,
})
export class CompanyEntity extends Model<CompanyEntity> {
	@Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
	id: number;

	@Column({ type: DataType.STRING })
	name: string;

	@Column({ type: DataType.INTEGER })
	number_of_employee_id: number;

	@Column({ type: DataType.INTEGER })
	industry_sector_Id: number;

	@Column({ type: DataType.STRING })
	website: string;

	@Column({ type: DataType.BOOLEAN })
	active: boolean;

	@Column({ type: DataType.DATE })
	created: Date;

	@Column({ type: DataType.BOOLEAN })
	custom_exchange_rate: boolean;

	@Column({ type: DataType.INTEGER })
	tem_provider_id: number;

	@Column({ type: DataType.STRING })
	copy_email: string;

	@Column({ type: DataType.INTEGER })
	subscription_package_id: number;

	@Column({ type: DataType.BOOLEAN })
	invoice_authorisation: boolean;

	@Column({ type: DataType.STRING })
	client_copy_email: string;

	@Column({ type: DataType.BOOLEAN })
	sso: boolean;

	@Column({ type: DataType.STRING })
	sso_link: string;

	@Column({ type: DataType.INTEGER })
	organisation_id: number;

	@Column({ type: DataType.INTEGER })
	fiscal_year_start_month: number;

	@Column({ type: DataType.TEXT })
	email_domain: string;

	@Column({ type: DataType.STRING })
	gl_code_1_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_2_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_3_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_4_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_5_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_6_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_7_definition: string;

	@Column({ type: DataType.STRING })
	gl_code_8_definition: string;

	@Column({ type: DataType.BOOLEAN })
	gl_code_1_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_2_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_3_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_4_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_5_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_6_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_7_required: boolean;

	@Column({ type: DataType.BOOLEAN })
	gl_code_8_required: boolean;

	@Column({ type: DataType.INTEGER })
	gl_code_1_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_1_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_2_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_2_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_3_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_3_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_4_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_4_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_5_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_5_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_6_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_6_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_7_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_7_max: number;

	@Column({ type: DataType.INTEGER })
	gl_code_8_min: number;

	@Column({ type: DataType.INTEGER })
	gl_code_8_max: number;

	@Column({ type: DataType.INTEGER })
	company_invoice_delivery: number;

	@Column({ type: DataType.STRING })
	invoice_payment_file_processing_script: string;

	@Column({ type: DataType.BOOLEAN })
	use_strict_invoice_number: boolean;

	@Column({ type: DataType.INTEGER })
	min_invoice_number: number;

	@Column({ type: DataType.INTEGER })
	max_invoice_number: number;

	@Column({ type: DataType.BOOLEAN })
	receive_zero_cost_invoice_email: boolean;

	@Column({ type: DataType.BOOLEAN })
	custom_fiscal_period: boolean;

	@Column({ type: DataType.STRING })
	email_for_invoice_delivery: string;

	@Column({ type: DataType.STRING })
	email_for_invoice_delivery_2: string;

	@Column({ type: DataType.STRING })
	email_for_invoice_delivery_3: string;

	@Column({ type: DataType.STRING })
	email_for_invoice_delivery_4: string;

	@Column({ type: DataType.STRING })
	email_for_invoice_delivery_5: string;

	@Column({ type: DataType.STRING })
	invoice_delivery_ftp_server_1: string;

	@Column({ type: DataType.STRING })
	invoice_delivery_ftp_user_1: string;

	@Column({ type: DataType.TEXT })
	invoice_delivery_ftp_password_1: string;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_ftp_folder_1: boolean;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_include_ap_file_1: boolean;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_include_ap_file_2: boolean;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_include_ap_file_3: boolean;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_include_ap_file_4: boolean;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_include_ap_file_5: boolean;

	@Column({ type: DataType.TEXT })
	ach_setting: string;

	@Column({ type: DataType.BOOLEAN })
	use_pgp_encryption_for_ap_feed: boolean;

	@Column({ type: DataType.TEXT })
	pgp_key: string;

	@Column({ type: DataType.BOOLEAN })
	send_bill_images_in_ap_feed: boolean;

	@Column({ type: DataType.BOOLEAN })
	encrypt_bill_images_in_ap_feed: boolean;

	@Column({ type: DataType.STRING })
	ap_feed_bill_image_folder: string;

	@Column({ type: DataType.STRING })
	invoice_delivery_ftp_server_port_1: string;

	@Column({ type: DataType.BOOLEAN })
	invoice_delivery_ftp_password_key_1: boolean;

	@Column({ type: DataType.STRING })
	email_template: string;

	@Column({ type: DataType.BOOLEAN })
	ticket_admin_reply_received_by_ticket_employee: boolean;

	@Column({ type: DataType.STRING })
	over_ride_ticket_subject_line: string;

	@Column({ type: DataType.TEXT })
	primary_billing_identifier: string;
	@Column({ type: DataType.TEXT })
	secondary_billing_identifier: string;

	@Column({ type: DataType.INTEGER })
	ticket_update_email_target: number;

	@Column({ type: DataType.INTEGER })
	ticket_update_email_client_reference_type: number;

	@Column({ type: DataType.BOOLEAN })
	client_api_enabled: boolean;

	@Column({ type: DataType.TEXT })
	work_flow_group_name: string;

	@Column({ type: DataType.STRING })
	verizon_ebonding_accessory_map: string;

	@Column({ type: DataType.BOOLEAN })
	send_approval_reminder: boolean;

	@Column({ type: DataType.BOOLEAN })
	ap_feed_notification: boolean;

	@Column({ type: DataType.BOOLEAN })
	ap_feed_notification_attach_file: boolean;

	@Column({ type: DataType.STRING })
	ap_feed_notification_email: string;
}
