import process from "node:process";
import { generateAction, menuConfig, help, renderListModels, selectGlobal, selectModel, setKey } from "./actions.js";
(async function () {
    const arg = process.argv.slice(2);
    const ACTIONS = {
        GENERATE: arg.length === 0,
        HELP: arg.includes('--help'),
        CONFIG: arg.includes('--config'),
        LIST: arg.includes('--list'),
        SET_KEY: arg.includes('--set-key'),
        SELECT_MODEL: arg.includes('--select-model'),
        SELECT_GLOBAL: arg.includes('--select-global'),
    };
    if (ACTIONS.GENERATE)
        await generateAction();
    else if (ACTIONS.HELP)
        await help();
    else if (ACTIONS.CONFIG)
        await menuConfig();
    else if (ACTIONS.LIST)
        await renderListModels();
    else if (ACTIONS.SET_KEY)
        await setKey();
    else if (ACTIONS.SELECT_MODEL)
        await selectModel();
    else if (ACTIONS.SELECT_GLOBAL)
        await selectGlobal();
    else {
        console.log("Invalid command");
        process.exit(1);
    }
    process.exit(0);
})();
