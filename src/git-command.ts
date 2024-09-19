import { exec } from 'child_process'

export const execute = async (command:string) => {
    return new Promise( (resolve, reject) => {
        try{
            console.log(`Executing command: ${command}`)
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log("error")
                    reject({ error:true, message:error.message });
                    return;
                }
                if (stderr) {
                    console.log("stderr")
                    resolve({ error:false, message:stderr });
                    return;
                }
                console.log("stdout")
                resolve({ error:false, message:stdout });
            });
        }catch(e){
            console.log("Error executing command", e)
            reject({ error:true, message:e });
        }
    })
}

// execute bash command with nodejs
export const getLastChanges = async () => {
    return await execute("git diff --cached")
}

export const getStatus = async () => {
    return await execute("git status")
}

export const commit = async (message:string) => {
    return await execute(`git commit -m "${message.replace(/`/gm, '"').replace(/'/gm, `'\\''`)} \n[by Kommiter]"`)
}

export const push = async () => {
    return await execute(`git push`)
}