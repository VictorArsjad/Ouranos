import {
	getProjectRootPath,
	runOnTerminal,
} from "../utils";

export const updateDependencies = () => {
	const path = getProjectRootPath();
	runOnTerminal(path, "mix deps.get");
};
