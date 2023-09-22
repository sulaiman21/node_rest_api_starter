import fs from "fs";
import path from "path";
import xmlToJson from "xml2json";
import { Parser } from "xml2js";

export class Xml2Js {
	private parser;
	constructor() {
		this.parser = new Parser();
	}
	async converToJs(filePath: string) {
		return new Promise((res, rej) => {
			fs.readFile(filePath, (err, data) => {
				if (err) {
					return console.log("[converToJs]ERROR ==> ", err);
				}

				this.parser.parseString(data, (error, result) => {
					if (error) {
						return console.log("[convertToJs->2]ERROR ==>", error);
					}

					return res(result);
				});
			});
		});
	}
}
