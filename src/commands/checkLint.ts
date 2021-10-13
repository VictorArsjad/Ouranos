import { getProjectRootPath, runOnTerminal } from "../helpers/utils";

export const checkLint = () => {
    const path = getProjectRootPath();
	runOnTerminal(path, "mix format --check-formatted");
};