import { Uri, window, workspace } from "vscode";
import * as vscode from "../helpers/code";
import { EditorType } from "../helpers/enums";
import { getFileDetail } from "../helpers/utils";

export const navigate = async () => {
	const focusedFilePath = vscode.getFocusedFilePath();
	if (!focusedFilePath) {
		return;
	}

	const fileDetail = getFileDetail(focusedFilePath);
	const possibleTargetPaths = getPossibleTargetPaths(fileDetail);

	const possibleFiles = await findAllFiles(possibleTargetPaths);
	switch (possibleFiles.length) {
		case 0:
			vscode.showErrorMessage("No result found.");
			break;

		case 1:
			openFile(possibleFiles[0]);
			break;

		default:
			showQuickPick(possibleFiles);
			break;
	}
};

async function findAllFiles(patterns: string[]) {
	const promises = patterns.map(async (pattern) => {
		const file = await vscode.findFiles(pattern);
		return file;
	});

	const possibleUris = await Promise.all(promises);
	return possibleUris.flat();
}

const getPossibleTargetPaths = (fileDetail: {
	fileName: string;
	appName: any;
	pathAfterAppName: string;
	fileType: EditorType;
}) => {
	const { appName, fileName } = fileDetail;
	const rules = [
		{
			name: "is_consumer_file",
			condition: appName === "consumer",
			test: "_test.exs",
			file: "/processor.ex",
		},
		{
			name: "is_schema_file",
			condition:
				fileName.endsWith("_schema_test.exs") ||
				fileName.endsWith(".schema.json"),
			test: "_schema_test.exs",
			file: ".schema.json",
		},
		{
			name: "is_normal_file",
			condition: true,
			test: "_test.exs",
			file: ".ex",
		},
	];

	return process(rules, fileDetail);
};

const process = (
	rules: any,
	fileDetail: {
		fileName: string;
		appName: any;
		pathAfterAppName: string;
		fileType: EditorType;
	}
) => {
	const { appName, pathAfterAppName, fileName, fileType } = fileDetail;
	const filePath = pathAfterAppName + fileName;
	const generalPath = removeFileTypeFromPath(filePath, appName);

	let possibleFilePaths: Array<string> = [];
	for (let r of rules) {
		if (r.condition) {
			if (fileType === EditorType.test) {
				possibleFilePaths.push(
					convert(generalPath, `**/${appName}/lib/**/`, r.test, r.file)
				);
			} else {
				possibleFilePaths.push(
					convert(generalPath, `**/${appName}/test/**/`, r.file, r.test)
				);
			}
		}
	}
	return possibleFilePaths;
};

const convert = (
	currentFilePath: string,
	prefix: string,
	from: string,
	to: string
) => {
	return `${prefix}${currentFilePath.replace(from, to)}`;
};

const removeFileTypeFromPath = (path: string, appName: string) => {
	return path
		.replace(`${appName}/`, "")
		.replace("test/", "")
		.replace("lib/", "");
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

const openFile = (file: Uri) => {
	return workspace.openTextDocument(file).then(window.showTextDocument);
};