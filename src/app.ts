class StudentApp {
    students: Student[] = [];
    localStorageKey = 'students';

    constructor() {
        this.loadStudents();
        this.renderStudents();
        this.addEventListeners();
    }

    addEventListeners(): void {
        const openModalBtn = document.getElementById('openModalBtn')!;
        const studentModal = new bootstrap.Modal(document.getElementById('studentModal')!);

        openModalBtn.addEventListener('click', () => {
            studentModal.show();
        });

        const studentForm = document.getElementById('studentForm')!;
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newStudent: Student = {
                id: Date.now(),
                firstName: (document.getElementById('firstName') as HTMLInputElement).value,
                lastName: (document.getElementById('lastName') as HTMLInputElement).value,
                address: (document.getElementById('address') as HTMLInputElement).value,
                birthDate: (document.getElementById('birthDate') as HTMLInputElement).value,
                position: (document.getElementById('position') as HTMLInputElement).value,
                typePosition: (document.getElementById('typePosition') as HTMLSelectElement).value,
                salary: parseFloat((document.getElementById('salary') as HTMLInputElement).value),
                isMarried: (document.getElementById('isMarried') as HTMLSelectElement).value === 'true',
            };
            this.addStudent(newStudent);
            studentForm.reset();
            studentModal.hide(); // Close the modal after adding the student
        });

        const searchInput = document.getElementById('search')!;
        searchInput.addEventListener('input', (e) => {
            const query = (e.target as HTMLInputElement).value;
            this.renderSearchResults(this.searchStudents(query));
        });
    }

    renderSearchResults(students: Student[]): void {
        const studentsList = document.getElementById('studentsList')!;
        studentsList.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${student.firstName}</td>
                <td>${student.lastName}</td>
                <td>${student.address}</td>
                <td>${student.birthDate}</td>
                <td>${student.position}</td>
                <td>${student.typePosition}</td>
                <td>${student.salary}</td>
                <td>${student.isMarried ? 'Ha' : 'Yo\'q'}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">Tahrirlash</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">O'chirish</button>
                </td>
            `;
            studentsList.appendChild(row);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new StudentApp();
});
