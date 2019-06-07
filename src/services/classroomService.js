import config from "../../src/config";

export const classroomService = {
    create
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
    fetch(url, params);
}