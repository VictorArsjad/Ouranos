import {
	getProjectRootPath,
	runOnTerminal,
} from "../helpers/utils";

export const updateDependencies = () => {
	const path = getProjectRootPath();
	runOnTerminal(path, "mix deps.get");
};
