import process from "node:process";
import { generateCommitMessage } from "./commands";


const arg = process.argv.slice(2)
const ACTIONS = {
    GENERATE: arg.length === 0 || arg.includes('-y') || arg.includes('-p'),
    SET_KEY: arg.includes('--set-key'),
    SELECT_MODEL: arg.includes('--select-model'),
}


if( ACTIONS.GENERATE ) generateCommitMessage()
else if( ACTIONS.SET_KEY ) {

}
else if( ACTIONS.SELECT_MODEL ) {

}
else {
    console.log("Invalid command")
    process.exit(1)
}