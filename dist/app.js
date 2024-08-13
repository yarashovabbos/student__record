"use strict";
let students = JSON.parse(localStorage.getItem('students') || '[]');
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.getElementById('studentTableBody');
const searchInput = document.getElementById('search');
const positionFilter = document.getElementById('positionFilter');
const isMarriedFilter = document.getElementById('isMarriedFilter');
const addStudentBtn = document.getElementById('addStudentBtn');
const modalTitle = document.querySelector('.modal-title');
const addStudentButton = document.getElementById('addStudentBtn');
let currentEditingId = null;
function renderStudents(studentsList = students) {
    studentTableBody.innerHTML = '';
    studentsList.forEach((student, index) => {
        const row = `<tr>
            <td>${index + 1}</td>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.address}</td>
            <td>${student.birthDate}</td>
            <td>${student.position}</td>
            <td>${student.typePosition}</td>
            <td>${student.salary}</td>
            <td>${student.isMarried ? 'Yes' : 'No'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>`;
        studentTableBody.insertAdjacentHTML('beforeend', row);
    });
}
function addStudent(student) {
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}
function updateStudent(id, updatedStudent) {
    students = students.map(student => student.id === id ? updatedStudent : student);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}
function editStudent(id) {
    const student = students.find(student => student.id === id);
    if (student) {
        currentEditingId = id;
        document.getElementById('firstName').value = student.firstName;
        document.getElementById('lastName').value = student.lastName;
        document.getElementById('address').value = student.address;
        document.getElementById('birthDate').value = student.birthDate;
        document.getElementById('position').value = student.position;
        document.getElementById('typePosition').value = student.typePosition;
        document.getElementById('salary').value = student.salary;
        document.getElementById('isMarried').checked = student.isMarried;
        modalTitle.textContent = "Edit Student";
        addStudentButton.textContent = "Update";
        $('#studentModal').modal('show');
    }
}
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}
function searchStudents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student => student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm));
    filterStudents(filteredStudents);
}
function filterStudents(studentsList = students) {
    let filteredStudents = studentsList;
    const selectedPosition = positionFilter.value;
    const selectedIsMarried = isMarriedFilter.value;
    if (selectedPosition) {
        filteredStudents = filteredStudents.filter(student => student.position === selectedPosition);
    }
    if (selectedIsMarried) {
        filteredStudents = filteredStudents.filter(student => student.isMarried.toString() === selectedIsMarried);
    }
    renderStudents(filteredStudents);
}
addStudentBtn.addEventListener('click', () => {
    const newStudent = {
        id: currentEditingId ? currentEditingId : Date.now(),
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        birthDate: document.getElementById('birthDate').value,
        position: document.getElementById('position').value,
        typePosition: document.getElementById('typePosition').value,
        salary: +document.getElementById('salary').value,
        isMarried: document.getElementById('isMarried').checked
    };
    if (currentEditingId) {
        updateStudent(currentEditingId, newStudent);
        currentEditingId = null;
    }
    else {
        addStudent(newStudent);
    }
    $('#studentModal').modal('hide');
    studentForm.reset();
    modalTitle.textContent = "O'quvchining ma'lumotlari";
    addStudentButton.textContent = "Qo'shish";
});
searchInput.addEventListener('input', searchStudents);
positionFilter.addEventListener('change', filterStudents);
isMarriedFilter.addEventListener('change', filterStudents);
renderStudents();
