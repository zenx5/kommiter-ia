import { exec } from 'child_process'

// execute bash command with nodejs
export const getLastChanges = async () => {
    return new Promise( (resolve, reject) => {
        exec('git diff --cached', (error, stdout, stderr) => {
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

export const getStatus = async () => {
    return new Promise( (resolve, reject) => {
        exec('git status', (error, stdout, stderr) => {
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