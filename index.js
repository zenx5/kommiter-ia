import { getLastChanges } from "./git-commands.js";

const lastChanges = await getLastChanges()

console.log( lastChanges )