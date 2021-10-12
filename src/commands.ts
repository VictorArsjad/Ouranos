import { navigate } from "./commands/navigate";
import { ping } from "./commands/ping";
import { runTestInCursor } from "./commands/runTestInCursor";
import { runTestsInFile } from "./commands/runTestsInFile";
import { updateDependencies } from "./commands/updateDependencies";

export const commands = [
	{
		command: "ouranos.ping",
		handler: ping,
	},
	{
		command: "ouranos.navigate",
		handler: navigate,
	},
	{
		command: "ouranos.runTestInCursor",
		handler: runTestInCursor,
	},
	{
		command: "ouranos.runTestsInFile",
		handler: runTestsInFile,
	},
	{
		command: "ouranos.updateDependencies",
		handler: updateDependencies,
	},
];
