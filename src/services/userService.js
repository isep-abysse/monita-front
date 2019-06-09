import config from '../config';

export const userService = {
    getAll,
    get,
    addMarks
};

async function getAll() {
    const response = await fetch(`${config.apiUrl}/users`);
    return await response.json()
}

async function get(id) {
    const response = await fetch(`${config.apiUrl}/users/${id}`)
    return await response.json()
}

// Send user subjects
async function addMarks(updatedUser) {
    const params = {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
        headers: {"content-type": "application/json"}
    };
    const url = `${config.apiUrl}/users/${updatedUser.id}`;
    await fetch(url, params)
}