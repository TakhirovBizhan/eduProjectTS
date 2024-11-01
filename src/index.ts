import { UserRepository, CourseRepository } from './repository.ts';
import { Student, Teacher, Course, UserIntersection } from './main.ts';
import { showToast } from './toast.ts';

const userRepo = new UserRepository();
const courseRepo = new CourseRepository();

// Elements for Students
const studentNameInput = document.getElementById('studentName') as HTMLInputElement;
const studentEmailInput = document.getElementById('studentEmail') as HTMLInputElement;
const entranceYearInput = document.getElementById('entranceYear') as HTMLInputElement;
const studentList = document.getElementById('studentList') as HTMLUListElement;

// Elements for Teachers
const teacherNameInput = document.getElementById('teacherName') as HTMLInputElement;
const teacherEmailInput = document.getElementById('teacherEmail') as HTMLInputElement;
const academicDegreeSelect = document.getElementById('academicDegree') as HTMLSelectElement;
const teacherList = document.getElementById('teacherList') as HTMLUListElement;

// Elements for Courses
const courseNameInput = document.getElementById('courseName') as HTMLInputElement;
const courseLimitInput = document.getElementById('courseLimit') as HTMLInputElement;
const courseList = document.getElementById('courseList') as HTMLUListElement;

// Add Student
document.getElementById('addStudentButton')?.addEventListener('click', async () => {
  const student = new Student(studentNameInput.value, studentEmailInput.value, parseInt(entranceYearInput.value));
  await userRepo.addStudent(student);
  loadStudents();
});

// Add Teacher
document.getElementById('addTeacherButton')?.addEventListener('click', async () => {
  const teacher = new Teacher(teacherNameInput.value, teacherEmailInput.value, academicDegreeSelect.value as 'отсутствует' | 'к.н.' | 'д.н.');
  await userRepo.addTeacher(teacher);
  loadTeachers();
});

// Add Course
document.getElementById('addCourseButton')?.addEventListener('click', async () => {
  const course = new Course(courseNameInput.value, parseInt(courseLimitInput.value), 'черновик');
  await courseRepo.addCourse(course);
  loadCourses();
});

// Load Students
async function loadStudents() {
  const students = await userRepo.getStudents();
  studentList.innerHTML = '';
  students.forEach((student: Student) => {
    const li = document.createElement('li');
    li.textContent = `${student.name} (${student.entranceYear})`;
    li.appendChild(createDeleteButton(() => deleteStudent(student.id)));
    studentList.appendChild(li);
  });
}

// Load Teachers
async function loadTeachers() {
  const teachers = await userRepo.getTeachers();
  teacherList.innerHTML = '';
  teachers.forEach((teacher: Teacher) => {
    const li = document.createElement('li');
    li.textContent = `${teacher.name} (${teacher.academicDegree})`;
    li.appendChild(createDeleteButton(() => deleteTeacher(teacher.id)));
    teacherList.appendChild(li);
  });
}

async function loadCourses() {
  const courses = await courseRepo.getCourses();
  courseList.innerHTML = '';
  courses.forEach((course: Course) => {
    const li = document.createElement('li');
    li.textContent = `${course.name} - Limit: ${course.limit} - Enrolled: ${course.students.length + course.teachers.length}/${course.limit}`;
    
    // Создаем список студентов с кнопками удаления
    const studentList = document.createElement('ul');
    studentList.textContent = 'Students:';
    course.students.forEach((student: Student) => {
      const studentLi = document.createElement('li');
      studentLi.textContent = student.name;
      
      // Кнопка удаления студента
      const deleteStudentButton = document.createElement('button');
      deleteStudentButton.textContent = 'Remove';
      deleteStudentButton.addEventListener('click', async () => {
        await courseRepo.deleteUserFromCourse(course.id, student.id, 'students');
        loadCourses();
      });
      studentLi.appendChild(deleteStudentButton);
      studentList.appendChild(studentLi);
    });

    // Создаем список преподавателей с кнопками удаления
    const teacherList = document.createElement('ul');
    teacherList.textContent = 'Teachers:';
    course.teachers.forEach((teacher: Teacher) => {
      const teacherLi = document.createElement('li');
      teacherLi.textContent = teacher.name;

      // Кнопка удаления преподавателя
      const deleteTeacherButton = document.createElement('button');
      deleteTeacherButton.textContent = 'Remove';
      deleteTeacherButton.addEventListener('click', async () => {
        await courseRepo.deleteUserFromCourse(course.id, teacher.id, 'teachers');
        loadCourses();
      });
      teacherLi.appendChild(deleteTeacherButton);
      teacherList.appendChild(teacherLi);
    });

    li.appendChild(studentList);
    li.appendChild(teacherList);

    li.appendChild(createStatusDropdown(course.id, course.status));
    li.appendChild(createDeleteButton(() => deleteCourse(course.id)));
    courseList.appendChild(li);
  });
}


// Delete functions
async function deleteStudent(id: string) {
  await userRepo.deleteStudent(id);
  loadStudents();
}

async function deleteTeacher(id: string) {
  await userRepo.deleteTeacher(id);
  loadTeachers();
}

async function deleteCourse(id: string) {
  await courseRepo.deleteCourse(id);
  loadCourses();
}

// Utility function to create delete button
function createDeleteButton(onClick: () => void) {
  const button = document.createElement('button');
  button.textContent = 'Delete';
  button.addEventListener('click', onClick);
  return button;
}

// Utility function to create status dropdown
function createStatusDropdown(courseId: string, currentStatus: 'черновик' | 'архивный' | 'активный') {
  const select = document.createElement('select');
  select.innerHTML = `
    <option value="черновик" ${currentStatus === 'черновик' ? 'selected' : ''}>черновик</option>
    <option value="архивный" ${currentStatus === 'архивный' ? 'selected' : ''}>архивный</option>
    <option value="активный" ${currentStatus === 'активный' ? 'selected' : ''}>активный</option>
  `;
  select.addEventListener('change', async (event) => {
    const newStatus = (event.target as HTMLSelectElement).value as 'черновик' | 'архивный' | 'активный';
    await courseRepo.updateCourseStatus(courseId, newStatus);
    loadCourses();
  });
  return select;
}

async function populateCourses() {
    const courses = await courseRepo.getCourses();
    const courseSelect = document.getElementById('selectCourse') as HTMLSelectElement;
    courseSelect.innerHTML = '';
    courses.forEach((course: Course) => {
      const option = document.createElement('option');
      option.value = course.id;
      option.textContent = course.name;
      courseSelect.appendChild(option);
    });
  }
  
  async function populateUsers(userType: 'student' | 'teacher') {
    const userSelect = document.getElementById('selectUser') as HTMLSelectElement;
    userSelect.innerHTML = '';
    const users = userType === 'student' ? await userRepo.getStudents() : await userRepo.getTeachers();
    users.forEach((user: UserIntersection) => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      userSelect.appendChild(option);
    });
  }
  
  document.getElementById('selectUserType')!.addEventListener('change', (e) => {
    const userType = (e.target as HTMLSelectElement).value as 'student' | 'teacher';
    populateUsers(userType);
  });
  
  document.getElementById('assignUserButton')!.addEventListener('click', async () => {
    const courseId = (document.getElementById('selectCourse') as HTMLSelectElement).value;
    const userId = (document.getElementById('selectUser') as HTMLSelectElement).value;
    const userType = (document.getElementById('selectUserType') as HTMLSelectElement).value;
  
    if (userId && courseId) {
      const user = userType === 'student' ? await userRepo.getStudentById(userId) : await userRepo.getTeacherById(userId);
      await courseRepo.addUserToCourse(courseId, user);
      showToast(`${user.name} has been assigned to the course.`, 'green');
      populateCourses();
    }
  });
  
  


  // Initial population
  populateCourses();
  populateUsers('student');

// Initial load
loadStudents();
loadTeachers();
loadCourses();