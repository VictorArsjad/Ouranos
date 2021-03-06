import * as vscode from "../helpers/code";
import { getAppPath, runOnTerminal, validateFilePath } from "../helpers/utils";

export const runTestsInFile = () => {
	const focusedEditor = vscode.getFocusedEditor();
	if (!focusedEditor) {
		return;
	}

	const focusedFilePath = vscode.getFilePath(focusedEditor);
	if (!validateFilePath(focusedFilePath)) {
		return;
	}

	vscode.showProgressBar("Running unit test..");

	const appPath = getAppPath(focusedFilePath);
	runOnTerminal(appPath, `mix test --no-start ${focusedFilePath}`);
};
