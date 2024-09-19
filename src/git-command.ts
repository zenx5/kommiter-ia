import { exec } from 'child_process'

export const execute = async (command:string) => {
    return new Promise( (resolve, reject) => {
        try{
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject({ error:true, message:error.message });
                    return;
                }
                if (stderr) {
                    reject({ error:false, message:stderr });
                    return;
                }
                resolve({ error:false, message:stdout });
            });
        }catch(e){
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
    const command = `git commit -m "${message.replace(/'/gm, `'\\''`)} \n[by Kommiter]"`
    console.log('command', command)
    const data = await execute(command)
    console.log('data', data)
    return data
}

export const push = async () => {
    return { error: false, message: "Push realizado con éxito." }
    // return await execute(`git push`)
}