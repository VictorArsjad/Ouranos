/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.commands = void 0;
const vscode_1 = __webpack_require__(1);
const utils_1 = __webpack_require__(3);
const ping = () => {
    vscode_1.window.showInformationMessage("Hello from Ouranos!");
};
const runTestInCursor = () => {
    const focusedEditor = vscode_1.window.activeTextEditor;
    if (!focusedEditor) {
        vscode_1.window.showErrorMessage(`Ouranos: Not a valid test file.`);
        return;
    }
    const focusedFilename = focusedEditor.document.fileName;
    if (!(0, utils_1.isInTestFolder)(focusedFilename)) {
        vscode_1.window.showErrorMessage(`Ouranos: Not a valid test file. Not in test folder.`);
        return;
    }
    if (!(0, utils_1.isElixirTestFile)(focusedFilename)) {
        vscode_1.window.showErrorMessage(`Not a valid test file.`);
        return;
    }
    const cursorPosition = focusedEditor.selection.active.line + 1;
    const appName = (0, utils_1.getAppName)(focusedFilename);
    (0, utils_1.changeDirectory)(appName);
    (0, utils_1.print)(`mix test --no-start ${focusedFilename}:${cursorPosition}`);
    (0, utils_1.show)();
};
const runTestsInFile = () => {
    const focusedEditor = vscode_1.window.activeTextEditor;
    if (!focusedEditor) {
        vscode_1.window.showErrorMessage(`Ouranos: Not a valid test file.`);
        return;
    }
    const focusedFilename = focusedEditor.document.fileName;
    if (!(0, utils_1.isInTestFolder)(focusedFilename)) {
        vscode_1.window.showErrorMessage(`Ouranos: Not a valid test file. Not in test folder.`);
        return;
    }
    if (!(0, utils_1.isElixirTestFile)(focusedFilename)) {
        vscode_1.window.showErrorMessage(`Not a valid test file.`);
        return;
    }
    const appName = (0, utils_1.getAppName)(focusedFilename);
    (0, utils_1.changeDirectory)(appName);
    (0, utils_1.print)(`mix test --no-start ${focusedFilename}`);
    (0, utils_1.show)();
};
exports.commands = [
    {
        command: "ouranos.ping",
        handler: ping,
    },
    {
        command: "ouranos.navigate",
        handler: ping,
    },
    {
        command: "ouranos.runTestInCursor",
        handler: runTestInCursor,
    },
    {
        command: "ouranos.runTestsInFile",
        handler: runTestsInFile,
    },
];


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.show = exports.print = exports.changeDirectory = exports.getAppName = exports.isElixirTestFile = exports.isInTestFolder = void 0;
const vscode_1 = __webpack_require__(1);
function isInTestFolder(filename) {
    return filename.includes("/test/");
}
exports.isInTestFolder = isInTestFolder;
function isElixirTestFile(filename) {
    return filename.endsWith("_test.exs");
}
exports.isElixirTestFile = isElixirTestFile;
function getAppName(filename) {
    return filename.replace(/test\/.*/, "");
}
exports.getAppName = getAppName;
function getTerminal() {
    return vscode_1.window.activeTerminal || vscode_1.window.createTerminal();
}
function changeDirectory(location) {
    const terminal = getTerminal();
    terminal.sendText(`cd ${location}`);
}
exports.changeDirectory = changeDirectory;
function print(command) {
    const terminal = getTerminal();
    terminal.sendText(command);
}
exports.print = print;
function show() {
    const terminal = getTerminal();
    terminal.show();
}
exports.show = show;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __webpack_require__(1);
const commands_1 = __webpack_require__(2);
function activate(context) {
    for (let obj of commands_1.commands) {
        const disposable = vscode.commands.registerCommand(obj.command, obj.handler);
        context.subscriptions.push(disposable);
    }
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map