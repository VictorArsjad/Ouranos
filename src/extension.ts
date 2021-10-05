import * as vscode from "vscode";
import { commands } from "./commands";

export function activate(context: vscode.ExtensionContext) {
	for (let obj of commands) {
		const disposable = vscode.commands.registerCommand(
			obj.command,
			obj.handler
		);
		context.subscriptions.push(disposable);
	}
}

export function deactivate() {}
