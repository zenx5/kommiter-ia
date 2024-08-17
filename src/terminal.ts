import readline from "node:readline"
// import process from "node:process"


const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
})



export const readTerminal = async (prompt:string) => {
    return new Promise((resolve, reject)=>{
        try{
            terminal.question(prompt, (response)=>{
                terminal.close()
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