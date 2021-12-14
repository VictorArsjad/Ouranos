import { GlobPattern, Uri, window, workspace } from "vscode";
import * as vscode from "../helpers/code";
import { EditorType } from "../helpers/enums";
import { getFileDetail, isInTestFolder } from "../helpers/utils";

export const navigate = () => {
	const focusedFilePath = vscode.getFocusedFilePath();
	if (!focusedFilePath) {
		return;
	}

	const {
		absolutePath: absolutePath,
		pathAfterAppName: pathAfterAppName,
		fileName: fileName,
		appName: appName,
	} = getFileDetail(focusedFilePath);

	switch (getCurrentFileType(absolutePath)) {
		case EditorType.file:
			const possibleTestFilePath = getPossibleTestFilePath(
				pathAfterAppName + fileName,
				appName
			);
			findAndOpenFile(`**/test/**/${possibleTestFilePath}`);
			break;

		case EditorType.test:
			const possibleFilePath = getPossibleFilePath(
				pathAfterAppName + fileName,
				appName
			);
			findAndOpenFile(`**/lib/**/${possibleFilePath}`);
			break;
	}
};

function findAndOpenFile(pattern: GlobPattern) {
	vscode.findFiles(pattern).then((result) => {
		if (isSingleResult(result)) {
			openFile(result[0]);
		} else {
			showQuickPick(result);
		}
	});
}

const isSingleResult = (result: Uri[]) => {
	return result.length === 1;
};

const getCurrentFileType = (filePath: string) => {
	if (isInTestFolder(filePath)) {
		return EditorType.test;
	}
	return EditorType.file;
};

const getPossibleFilePath = (filePath: string, appName: string) => {
	let updatedFilePath;
	if (appName === "consumer") {
		updatedFilePath = filePath.replace("_test.exs", "/processor.ex");
	} else if (filePath.endsWith("_schema_test.exs")) {
		updatedFilePath = filePath.replace("_schema_test.exs", ".schema.json");
	} else {
		updatedFilePath = filePath.replace("_test.exs", ".ex");
	}

	return updatedFilePath.replace("test/", "").replace(`${appName}/`, "**");
};

const getPossibleTestFilePath = (filePath: string, appName: string) => {
	let updatedFilePath;
	if (appName === "consumer") {
		updatedFilePath = filePath.replace("/processor.ex", "_test.exs");
	} else if (filePath.endsWith(".schema.json")) {
		updatedFilePath = filePath.replace(".schema.json", "_schema_test.exs");
	} else {
		updatedFilePath = filePath.replace(".ex", "_test.exs");
	}

	return updatedFilePath.replace("lib/", "").replace(`${appName}/`, "**");
};

const openFile = (file: Uri) => {
	return workspace.openTextDocument(file).then(window.showTextDocument);
};

async function showQuickPick(res: Uri[]) {
	const uriPath = res.map((uri) => {
		return uri.path;
	});
	const result = await window.showQuickPick(uriPath, {
		placeHolder: "Pick unit test to open..",
	});

	const selected = res.find((x) => x.path === result);
	if (!selected) {
		return;
	}
	openFile(selected!!);
}
