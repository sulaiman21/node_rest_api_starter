import { Service } from "node-windows";

/**
 * This is a windows specific service which will run in the background on windows machine
 */
const svc = new Service({
	name: "virtual-seating-be",
	description: "Virtual Seating backend",

	/**
	 * Script will hold the path of the project
	 * So for window server we will replace it according to our project's location
	 * We will point the main route file.
	 * Technically we will build our project and we will pass a build code path here
	 * We will change this script path to our build path once its build
	 * */
	script: "~/build/server.js", // We will change this script to windows location
});

svc.on("install", () => {
	svc.start();
});

svc.install();
