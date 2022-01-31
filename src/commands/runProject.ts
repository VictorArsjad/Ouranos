import * as glob from "fast-glob";
import * as vsc from "vscode";
import { getWorkspace } from "../helpers/code";
import { runOnTerminal } from "../helpers/utils";

export const runProject = async () => {
	const rootPath = getWorkspace();

	vsc.window
		.showQuickPick(
			await glob(`**`, {
				cwd: `${rootPath}/apps`,
				onlyDirectories: true,
				// ignore: [`**/**`],
				deep: 0,
			})
		)
		.then((sel) => {
			if (!sel) {
				return;
			}
			runOnTerminal(`${rootPath}/apps/${sel}`, "mix run --no-halt");
		});
};
