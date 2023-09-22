import { authenticator } from "otplib";

export const verifyTwoFactor = (
	secret: string,
	two_factor_code: string
): boolean => {
	try {
		return authenticator.verify({ secret, token: two_factor_code });
	} catch (error) {}
};
