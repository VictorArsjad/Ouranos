import { checkLint } from "./commands/checkLint";
import { navigate } from "./commands/navigate";
import { ping } from "./commands/ping";
import { pry } from "./commands/pry";
import { runCurrentProject } from "./commands/runCurrentProject";
import { runProject } from "./commands/runProject";
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
	{
		command: "ouranos.checkLint",
		handler: checkLint,
	},
	{
		command: "ouranos.runCurrentProject",
		handler: runCurrentProject,
	},
	{
		command: "ouranos.runProject",
		handler: runProject,
	},
	{
		command: "ouranos.pry",
		handler: pry,
	},
];
