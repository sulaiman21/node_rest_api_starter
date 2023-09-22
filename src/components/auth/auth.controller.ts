import { NextFunction, Request, Response, Router } from "express";
import passport from "../../libs/passport";
import AsyncTryCatch from "../../utils/asyncTryCatch";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { Strategy } from "passport-saml";

const authService = new AuthService();
const router = Router();

router.post(
	"/discovery",
	AsyncTryCatch(async (req: Request, res: Response) => {
		try {
			const user = await authService.discoverUser(req.body);

			return res.status(httpStatus.OK).json(user);
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: error?.message || "Internal server error" });
		}
	})
);

router.post(
	"/login-with-password",
	AsyncTryCatch(async (req: Request, res: Response) => {
		try {
			const user = await authService.authenticateUserWithPassword(req.body);

			return res.status(httpStatus.OK).json(user);
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: error?.message || "Internal server error" });
		}
	})
);

router.post(
	"/login-with-pin",
	AsyncTryCatch(async (req: Request, res: Response) => {
		try {
			const user = await authService.authenticateUserWithPin(req.body);

			return res.status(httpStatus.OK).json(user);
		} catch (error) {
			return res
				.status(httpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: error?.message || "Internal server error" });
		}
	})
);

// SAML
router.get(
	"/sso/saml/login",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, from, cert, entryPoint } = req.query;
			// NOTE: we will get the certificate from our database. Its just a temporary thing
			const strategy = getStrategy(
				email?.toString?.(),
				from?.toString?.(),
				cert?.toString?.(),
				entryPoint?.toString?.()
			)();

			passport.use(strategy);

			return passport.authenticate("saml", {
				successRedirect: "/api/v1/auth/sso/saml/login-success",
				failureRedirect: "/api/v1/auth/sso/saml/login-failure",
			})(req, res, next);
		} catch (error) {}
	}
);

router.post(
	"/sso/saml/callback",
	async (req: Request, res: Response, next: NextFunction) => {
		// const { email, from, cert, entryPoint } = req.query;
		// const strategy = getStrategy(
		// 	email?.toString?.(),
		// 	from?.toString?.(),
		// 	cert?.toString?.(),
		// 	entryPoint?.toString?.()
		// )();
		passport.authenticate("saml", {
			successRedirect: "/api/v1/auth/sso/saml/login-success",
			failureRedirect: "/api/v1/auth/sso/saml/login-failure",
		})(req, res, next);
	}
);

router.get(
	"/sso/saml/login-success",
	AsyncTryCatch(async (req: any, res: Response) => {
		try {
			//TODO: Login user and generate token
			if (!req.user) {
				return res.status(401).json({ message: "Unauthorized!" });
			}

			const body = {
				email: req.user.email,
			};
			// Need to do a proper authentication with correct email
			// const user = await authService.authenticateuserWithSSO(body);
			return res.redirect(
				`http://localhost:3000?email=${
					req.user.email
				}&token=token${1234}&error=null`
			);
		} catch (error) {
			return res.redirect(`http://localhost:3000/error?issue=Not found`);
		}
	})
);

router.get("/sso/saml/login-failure", (req, res) => {
	//TODO: Redirect user back to login page.
	return res.redirect(`http://localhost:3000/error?issue=Unauthorised`);
});

const getStrategy = (
	email: string,
	from: string,
	cert: string,
	entryPoint: string
) => {
	let strategy;

	return () => {
		strategy = new Strategy(
			{
				providerName: "Veroxos",
				issuer: "https://2fb1-115-186-154-198.ngrok-free.app/",
				path: "/api/v1/auth/sso/saml/login",
				callbackUrl: "http://localhost:5050/api/v1/auth/sso/saml/callback",
				// Static okta login
				cert: `MIIDqjCCApKgAwIBAgIGAYqYjDTkMA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFjAUBgNVBAMMDXRyaWFsLTg2ODk1NjMxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMjMwOTE1MTExMzAwWhcNMzMwOTE1MTExMzU5WjCBlTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRYwFAYDVQQDDA10cmlhbC04Njg5NTYzMRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtfZej/mlz2KnYx7wS1crIDcZz0SwPFDHPzWEj6eIDTD4y12CNmpf6z0WXXy85aHamgKA/dZJEI8ylhFic9uascBvbqowOhR3tZU2qjaVuvMrPpWdfbhSM4vcetG3Ha5QWNfsVtcz09Jui/sfAtAPZ2BnDsapCtADAngC3QSNsOB6nWbDbYhSa6653Cg/vE8lOMP6JZzrlcVFPzz/OaWoghzvHzzgVZSvItPIYgF8pD7IHKfXDH5SwowNTUQrH1d3giwMd+xq8oUJ+AHTxhvmqH8lcDMRkNuf+Zv7Q7K7R2ldeYGzUg3OBOoF8UAwI6R0FNwRKsrriTgWclUv6l7YdQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBkK0oX7AFMf155w9TBD5YDKMKeI30/3GHPUPRAqtGZ8wzIx5L5VNPJco7S61E/RrV8DcBDTK+NxpC8SeDxQiQBcqe6fUcXrZsRT2j4U/kwQHoGvyWoKuZuLi7F6B9OK0gs68CsnUEHmYXbxqEGd+Yn24uLQabkPl4mKlfgnyQ5BfNyRAim24LOw1C5AfYagWFOFWam0PMRRDtt07IKU40ovQFXzY/3iZUEcgWFihdpxh1c/OrK44QbcONIZqKJocsnEVjs0/bkGPEV6yI9QMvMW/WzqzC67x86HoeTrCtk2WtsMlVQ44k9pGwXodG3vzzSMoekFMOUyCkHU/4GilRC`,
				entryPoint:
					"https://trial-8689563.okta.com/app/trial-8689563_testingappveroxos_1/exk7k74sxcEclg7rr697/sso/saml",

				/**
				 * NOTE:  We will get entryPoint from the front-end because we will forward those information to our front-end
				 *  and front-end will redriect the user to our backend initiate the SSO.
				 */
				// cert: cert,
				// entryPoint: entryPoint.toString(),

				// Testing microsoft login
				// cert: `MIIC8DCCAdigAwIBAgIQZx/JqVXtFohMP1q4c4/mmjANBgkqhkiG9w0BAQsFADA0MTIwMAYDVQQDEylNaWNyb3NvZnQgQXp1cmUgRmVkZXJhdGVkIFNTTyBDZXJ0aWZpY2F0ZTAeFw0yMzAxMzEwOTMxNDhaFw0yNjAxMzEwOTMxNDdaMDQxMjAwBgNVBAMTKU1pY3Jvc29mdCBBenVyZSBGZWRlcmF0ZWQgU1NPIENlcnRpZmljYXRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtkvx4OSq20BVvkHKAaA0v50KZaZRozpKcp3jwrE9+GuKGUhXlZseKPAzdUZwVdYJpYhuYZpY2ygAXe7qS0+BJeW2Me/ZlODpEo0R3sdkyHu+L0Y2eBs3XW6g/WEE5Z5iLfQeA5Icvo8kIDeizQDAsQkUzjUuT0Yl2Rje/P0z53VU7dsC/SKe1A8oUoAaBSFV1tJ7iTtyeMJvwcj8+XeswdfRVjjFC9iOsh+xveZbgwBzLAssVarbz9BW/mACA10mgftNuwJUVRpqWmG/Ot3/Z4RmYINhjJteS5FNRVz3R90TmcEFB+5hCNkRs7dg1RgkSCCeH+SF/JCj+ioPx0+6/QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBrUy0O5yyitw8qaJf8q8RpRsltjGkOUJWsv2bcQ/75kRkmIEceBHTYGqf40cQClPYQTJUuAJI6hhNrNmkL3QsPCIWtjrNeBzLOaludISaisJbnqV72ZECqHaDT1OmRI0OL1LesjmdIgXBLxtl5L8wew+lZskm1mMDpsmzWWA3n7U/tKybHltNsadUidG13MBRN1SxQsj4sJD/BtHFK2jXJmkOvEqA2fuCOr4BPwBLvgw1D5CuN4FKS+qYEj4NamMuEewtrOKxXWZHf3seUwmDz5NQc890vgnPYSbjRprB8N7laAR94iKthqYXva7yTrV6DDY9pp7t6AL70ggMnwHAl`,
				// entryPoint:
				// 	"https://login.microsoftonline.com/ef25a5f4-1fb0-42ba-83e1-a708fe83b4ef/saml2",
				protocol: "http://",
				// entityId: 'https://saml.example.com/entityid',
				wantAssertionsSigned: true,
			},
			(profile: any, done: any) => {
				if (!profile) {
					done({ message: "unable to load user" }, null);
				}

				console.log("profile ==> ", profile);
				const user = {
					email: profile?.nameID,
				};

				return done(null, user);
			}
		);

		return strategy;
	};
};

export default router;
