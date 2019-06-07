import config from '../config';

export const userService = {
    getAll
};

async function getAll() {
    const response = await fetch(`${config.apiUrl}/users`);
    return await response.json()
}