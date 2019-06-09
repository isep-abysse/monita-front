import config from "../../src/config";

export const classroomService = {
    create,
    getAll,
    get
};

function create(name, teacher, students) {
    const classroom = {
        name: name,
        teacher: teacher,
        students: students
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