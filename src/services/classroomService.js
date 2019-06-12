import config from "../../src/config";

export const classroomService = {
    create,
    getAll,
    get,
    getEverything,
    update
};

function create(name, teacherId, studentIds) {
    const classroom = {
        name: name,
        teachers: teacherId,
        students: studentIds
    };
    const params = {
        method: 'POST',
        body: JSON.stringify(classroom),
        headers: {"content-type": "application/json"}
    };
    const url = `${config.apiUrl}/classrooms`;
    fetch(url, params)
}

async function getAll(teacherId) {
    const url = `${config.apiUrl}/classrooms/all/${teacherId}`;
    const response = await fetch(url);
    return await response.json()
}

async function get(classroomId) {
    const url = `${config.apiUrl}/classrooms/${classroomId}`;
    const response = await fetch(url);
    return await response.json()
}

async function getEverything() {
    const url = `${config.apiUrl}/classrooms/all`;
    const response = await fetch(url);
    return await response.json()
}

async function update(updatedClassroom) {
    const params = {
        method: 'PUT',
        body: JSON.stringify(updatedClassroom),
        headers: {"content-type": "application/json"}
    };
    const url = `${config.apiUrl}/classrooms/${updatedClassroom.id}`;
    await fetch(url, params)
}