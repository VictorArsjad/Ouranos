import { window } from "vscode";

export const ping = () => {
	window.showInformationMessage("Hello from Ouranos!");
};