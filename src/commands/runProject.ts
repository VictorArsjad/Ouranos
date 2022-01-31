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
				deep: 0,
			}), {
                placeHolder: "Pick project to run..",
            }
		)
		.then((sel) => {
			if (!sel) {
				return;
			}
			runOnTerminal(`${rootPath}/apps/${sel}`, "mix run --no-halt");
		});
};
