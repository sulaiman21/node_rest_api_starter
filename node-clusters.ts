import cluster from "cluster";
import os from "os";
import process from "process";

const cpus = os.cpus().length;

if (cluster.isPrimary) {
	console.log(`Process id ${process.pid} is running`);

	// cluster primary
	/**
	 * This will also change into /build/server.js once we create a build
	 */
	cluster.setupPrimary({
		exec: __dirname + "/server.ts",
	});

	// create clusters
	for (let i = 0; i < cpus; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} has been closed!`);
		console.log(`creating new cluster!`);
		cluster.fork();
	});
}
