import { exec } from 'child_process'

export const execute = async (command:string) => {
    return new Promise( (resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout);
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
    return await execute(`git commit -m "${message} \n[by Kommiter"]`)
}

export const push = async () => {
    return await execute(`git push`)
}