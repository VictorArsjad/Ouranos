import { Vscode } from "../helpers/code";
import { getAppPath, runOnTerminal, validateFilePath } from "../helpers/utils";

const vscode = new Vscode();

export const runTestsInFile = () => {
	const focusedEditor = vscode.getFocusedEditor();
	if (!focusedEditor) {
		return;
	}

	const focusedFilePath = vscode.getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) {
		return;
	}

	const appPath = getAppPath(focusedFilePath);
	runOnTerminal(appPath, `mix test --no-start ${focusedFilePath}`);
};
