import { exec } from 'child_process';
export const execute = async (command) => {
    return new Promise((resolve, reject) => {
        try {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject({ error: true, message: error.message });
                    return;
                }
                if (stderr) {
                    resolve({ error: false, message: stderr });
                    return;
                }
                resolve({ error: false, message: stdout });
            });
        }
        catch (e) {
            reject({ error: true, message: e });
        }
    });
};
// execute bash command with nodejs
export const getLastChanges = async () => {
    return await execute("git diff --cached");
};
export const getStatus = async () => {
    return await execute("git status");
};
export const commit = async (message) => {
    return await execute(`git commit -m "${message.replace(/`/gm, '"').replace(/'/gm, `'\\''`)} \n[by Kommiter]"`);
};
export const push = async () => {
    return await execute(`git push`);
};
