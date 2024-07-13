
export const getEnv = (text: string): string => {
    return process.env[text] || "";
};