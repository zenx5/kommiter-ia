import { exec } from 'child_process'

export const execute = async (command:string) => {
    return new Promise( (resolve, reject) => {
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
    return await execute(command)
}

export const push = async () => {
    return { error: false, message: "Push realizado con éxito." }
    // return await execute(`git push`)
}