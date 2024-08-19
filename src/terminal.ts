import readline from "node:readline"
import chalk from "chalk"
// import process from "node:process"


const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
})



export const readTerminal = async (prompt:string, close?:boolean) => {
    return new Promise((resolve, reject)=>{
        try{
            // clean terminal
            terminal.write(null, {ctrl:true, name:"l"})
            terminal.question(colorize(prompt), (response)=>{
                if( close ) terminal.close()
                resolve(response)
            })
        }catch(e){
            reject(e)
        }
    })
}

export const writeTerminal = async (message) => {
    // await process.stdout.write(message)
}

export const colorize = (message:string) => {
    return message.replace(/\[red\]([\s\S]*?)\[\/red\]/g, (match) => {
        return chalk.red(match.replace(/\[red\]/g, "").replace(/\[\/red\]/g, ""))
    }).replace(/\[green\]([\s\S]*?)\[\/green\]/g, (match) => {
        return chalk.green(match.replace(/\[green\]/g, "").replace(/\[\/green\]/g, ""))
    })
}