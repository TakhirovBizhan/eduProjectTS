import { UserRepository, CourseRepository } from './repository.ts';
import { Student, Teacher, Course, UserIntersection } from './main.ts';
import { showToast } from './toast.ts';

const userRepo = new UserRepository();
const courseRepo = new CourseRepository();

const studentList = document.getElementById('studentList') as HTMLUListElement;

const teacherList = document.getElementById('teacherList') as HTMLUListElement;

const courseList = document.getElementById('courseList') as HTMLUListElement;

const studentForm = document.getElementById('studentForm') as HTMLFormElement;
const teacherForm = document.getElementById('teacherForm') as HTMLFormElement;
const courseForm = document.getElementById('courseForm') as HTMLFormElement;


//форма для добавления студента
if (studentForm) {
  studentForm.addEventListener("submit", handleStudentFormSubmit)
}

async function handleStudentFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  try {
    const formData = new FormData(studentForm)

    const studentName = formData.get('name')?.toString()
    const studentEmail = formData.get('email')?.toString()
    const studentEntranceYear = Number(formData.get('entranceYear')?.toString())

    if (studentName && studentEmail && studentEntranceYear) {
      const student = new Student(studentName, studentEmail, studentEntranceYear);
      await userRepo.addStudent(student);
      showToast(`${studentName} was added!`, 'green')
    }
    loadStudents();
    studentForm.reset();
  } catch (e) {
    console.error(e)
  }
}

//форма для добавления преподавателя
if (teacherForm) {
  teacherForm.addEventListener("submit", handleTeacherFormSubmit)
}

async function handleTeacherFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  try {
    const formData = new FormData(teacherForm)

    const teacherName = formData.get('name')?.toString()
    const teacherEmail = formData.get('email')?.toString()
    const teacherAcademicDegree = formData.get('academicDegree')?.toString()

    console.log(teacherName, teacherEmail, teacherAcademicDegree)

    if (teacherName && teacherEmail && teacherAcademicDegree) {
      const teacher = new Teacher(teacherName, teacherEmail, teacherAcademicDegree as 'отсутствует' | 'к.н.' | 'д.н.');
      await userRepo.addTeacher(teacher);
      showToast(`${teacherName} was added!`, 'green')
    }
    loadTeachers();
    teacherForm.reset();
  } catch (e) {
    console.error(e)
  }
}

//форма для добавления курса
if (courseForm) {
  courseForm.addEventListener("submit", handleCourseFormSubmit)
}

async function handleCourseFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  try {
    const formData = new FormData(courseForm)

    const courseName = formData.get('name')?.toString()
    const limit = Number(formData.get('limit')?.toString())

    if (courseName && limit) {
      const course = new Course(courseName, limit, 'черновик');
      await courseRepo.addCourse(course);
      showToast(`${courseName} was created!`, 'green')
    }
    loadCourses();
    courseForm.reset();
  } catch (e) {
    console.error(e)
  }
}

async function loadStudents() {
  const students = await userRepo.getStudents();
  studentList.innerHTML = '';
  students.forEach((student: Student) => {
    const li = document.createElement('li');
    const pName = document.createElement('p');
    const pYear = document.createElement('p');
    const pMail = document.createElement('p');

    pName.textContent = student.name;
    pYear.textContent = `Поступление: ${student.entranceYear} г.`;
    pMail.textContent = `Почта: ${student.email}`
    pName.classList.add('text');
    pMail.classList.add('text');

    li.appendChild(pName);
    li.appendChild(pYear);
    li.appendChild(pMail);
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
    const pName = document.createElement('p');
    const pDegree = document.createElement('p');
    const pMail = document.createElement('p');

    pName.classList.add('text');
    pMail.classList.add('text');
    pName.textContent = teacher.name;
    pDegree.textContent = `Степень: ${teacher.academicDegree}`;
    pMail.textContent = `почта: ${teacher.email}`
    li.appendChild(pName);
    li.appendChild(pDegree);
    li.appendChild(pMail);
    li.appendChild(createDeleteButton(() => deleteTeacher(teacher.id)));
    teacherList.appendChild(li);
  });
}

async function loadCourses() {
  const courses = await courseRepo.getCourses();
  courseList.innerHTML = '';
  courses.forEach((course: Course) => {
    const li = document.createElement('li');

    const nameParagraph = document.createElement('p');
    nameParagraph.textContent = `${course.name}`;

    const limitParagraph = document.createElement('p');
    limitParagraph.textContent = `Лимит: ${course.limit}`;

    const enrolledParagraph = document.createElement('p');
    enrolledParagraph.textContent = `Записаны: ${course.students.length + course.teachers.length}/${course.limit}`;

    li.appendChild(nameParagraph);
    li.appendChild(limitParagraph);
    li.appendChild(enrolledParagraph);


    const studentDetails = document.createElement('details');
    const studentSummary = document.createElement('summary');
    studentSummary.textContent = 'Студенты';
    studentDetails.appendChild(studentSummary);

    const studentList = document.createElement('ul');
    course.students.forEach((student: Student) => {
      const studentLi = document.createElement('li');
      studentLi.classList.add('sum__item')
      studentLi.textContent = student.name;

      const deleteStudentButton = document.createElement('button');
      deleteStudentButton.textContent = 'X';
      deleteStudentButton.addEventListener('click', async () => {
        await courseRepo.deleteUserFromCourse(course.id, student.id, 'students');
        loadCourses();
      });
      studentLi.appendChild(deleteStudentButton);
      studentList.appendChild(studentLi);
    });
    studentDetails.appendChild(studentList);

    const teacherDetails = document.createElement('details');
    const teacherSummary = document.createElement('summary');
    teacherSummary.textContent = 'Преподаватели';
    teacherDetails.appendChild(teacherSummary);

    const teacherList = document.createElement('ul');
    course.teachers.forEach((teacher: Teacher) => {
      const teacherLi = document.createElement('li');
      const teacherPi = document.createElement('p')
      teacherPi.textContent = teacher.name;
      teacherLi.classList.add('sum__item')

      // Кнопка удаления преподавателя
      const deleteTeacherButton = document.createElement('button');
      deleteTeacherButton.textContent = 'X';
      deleteTeacherButton.addEventListener('click', async () => {
        await courseRepo.deleteUserFromCourse(course.id, teacher.id, 'teachers');
        loadCourses();
      });
      teacherLi.appendChild(teacherPi)
      teacherLi.appendChild(deleteTeacherButton);
      teacherList.appendChild(teacherLi);
    });
    teacherDetails.appendChild(teacherList);

    li.appendChild(studentDetails);
    li.appendChild(teacherDetails);

    li.appendChild(createStatusDropdown(course.id, course.status));
    li.appendChild(createDeleteButton(() => deleteCourse(course.id)));
    courseList.appendChild(li);
  });
}

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

function createDeleteButton(onClick: () => void) {
  const button = document.createElement('button');
  button.textContent = 'X';
  button.addEventListener('click', onClick);
  return button;
}

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
    try {
      const user = userType === 'student'
        ? await userRepo.getStudentById(userId)
        : await userRepo.getTeacherById(userId);

      await courseRepo.addUserToCourse(courseId, user);
      showToast(`${user.name} has been assigned to the course.`, 'green');
      populateCourses();
    } catch (e) {
      showToast(`${e}`, 'red');
    }
  }
});



populateCourses();
populateUsers('student');

loadStudents();
loadTeachers();
loadCourses();