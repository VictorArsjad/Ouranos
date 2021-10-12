import { Vscode } from "./code";

const vscode = new Vscode();

export function isInTestFolder(filePath: string) {
	return filePath.includes("/test/");
}

export function isElixirTestFile(filePath: string) {
	return filePath.endsWith("_test.exs");
}

export function runOnTerminal(location: string, command: string) {
	const terminal = vscode.getTerminal();
	terminal.sendText(`cd ${location}`);
	terminal.sendText(command);
	terminal.show();
}

export const getFileDetail = (absolutePath: string) => {
	return {
		absolutePath: absolutePath,
		fileName: getFileName(absolutePath),
		appPath: getAppPath(absolutePath),
		appName: getAppName(absolutePath),
		pathAfterAppName: getPathAfterAppName(absolutePath),
	};
};

export const getAppPath = (filePath: string) => {
	return filePath.replace(/test\/.*/, "").replace(/lib\/.*/, "");
};

export const validateFilePath = (filePath: string) => {
	if (!isInTestFolder(filePath)) {
		vscode.showErrorMessage("Not a valid test file. Not in test folder.");
		return false;
	}
	if (!isElixirTestFile(filePath)) {
		vscode.showErrorMessage("Not an elixir test file.");
		return false;
	}
	return true;
};

const getFileName = (filePath: string) => {
	return filePath.replace(/.*\//, "");
};

const getAppName = (filePath: string) => {
	const stack = filePath.split("/");
	for (let i = 0; i < filePath.length; i++) {
		if (stack[i] === "apps") {
			return stack[i + 1];
		}
	}
	return "";
};

const getPathAfterAppName = (filePath: string) => {
	const appPath = getAppPath(filePath);
	const fileName = getFileName(filePath);
	return filePath.replace(appPath, "").replace(fileName, "");
};
