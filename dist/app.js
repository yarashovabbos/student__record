"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typePositions = exports.positions = void 0;
exports.showToast = showToast;
// config.ts
exports.positions = ["ReactJs Developer", "NodeJs Developer", "Go Developer"];
exports.typePositions = ["junior", "middle", "senior"];
// utils.ts
function showToast(message, type = "success") {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: type === "success" ? "green" : "red",
    }).showToast();
}
let students = JSON.parse(localStorage.getItem('students') || '[]');
document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const newStudent = {
        id: Date.now(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        birthDate: document.getElementById('birthDate').value,
        position: document.getElementById('position').value,
        typePosition: document.getElementById('typePosition').value,
        salary: Number(document.getElementById('salary').value),
        isMarried: document.getElementById('isMarried').checked,
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    showToast('Student added successfully');
    renderStudents();
});
function renderStudents() {
    const tableBody = document.getElementById('studentsTable').querySelector('tbody');
    tableBody.innerHTML = '';
    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.address}</td>
            <td>${student.birthDate}</td>
            <td>${student.position}</td>
            <td>${student.typePosition}</td>
            <td>${student.salary}</td>
            <td>${student.isMarried ? 'Married' : 'Not Married'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    showToast('Student deleted successfully', 'error');
    renderStudents();
}
// Implement search, filter, and sort functionalities here
renderStudents();
function Toastify(arg0) {
    throw new Error("Function not implemented.");
}
