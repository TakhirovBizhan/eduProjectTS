import axios from "axios";
import { Student, Teacher, Course, UserIntersection } from "./main.ts";

const API_BASE_URL = "http://localhost:3000"; // Адрес JSON Server

export class UserRepository {
  async addTeacher(teacher: Teacher) {
    const response = await axios.post(`${API_BASE_URL}/teachers`, teacher);
    return response.data;
  }

  async deleteTeacher(userId: string) {
    await axios.delete(`${API_BASE_URL}/teachers/${userId}`);
  }

  async getTeachers() {
    const response = await axios.get(`${API_BASE_URL}/teachers`);
    return response.data;
  }

  async addStudent(student: Student) {
    const response = await axios.post(`${API_BASE_URL}/students`, student);
    return response.data;
  }

  async deleteStudent(userId: string) {
    await axios.delete(`${API_BASE_URL}/students/${userId}`);
  }

  async getStudents() {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  }

  async getStudentById(userId: string) {
    const response = await axios.get(`${API_BASE_URL}/students`);
    const courseData: Student[] = response.data;
    const student = courseData.find(
      (stud: Student) => stud.id === userId
    );

    if (!student) {
      throw new Error("No user with this id!");
    }

    return student;
  }

  async getTeacherById(userId: string) {
    const response = await axios.get(`${API_BASE_URL}/teachers`);
    const courseData: Teacher[] = response.data;
    const teacher = courseData.find(
      (teacher: Teacher) => teacher.id === userId
    );

    if (!teacher) {
      throw new Error("No user with this id!");
    }

    return teacher;
  }
}

export class CourseRepository {
  async getStudentById(userId: string, courseId: string) {
    const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
    const courseData: Course = response.data;
    const student = courseData.students.find(
      (stud: Student) => stud.id === userId
    );

    if (!student) {
      throw new Error("No user with this id!");
    }

    return student;
  }

  async getTeacherById(userId: string, courseId: string) {
    const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
    const courseData: Course = response.data;
    const teacher = courseData.teachers.find(
      (teacher: Teacher) => teacher.id === userId
    );

    if (!teacher) {
      throw new Error("No user with this id!");
    }

    return teacher;
  }

  async addCourse(course: Course) {
    const response = await axios.post(`${API_BASE_URL}/courses`, course);
    return response.data;
  }

  async deleteCourse(id: string) {
    await axios.delete(`${API_BASE_URL}/courses/${id}`);
  }

  async addUserToCourse(courseId: string, user: UserIntersection) {
    try {
      // Сначала получаем текущий объект курса
      const { data: course } = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
  
      if ("entranceYear" in user) {
        // Если это студент, добавляем его в массив `students`
        const updatedStudents = [...course.students, user];
        await axios.patch(`${API_BASE_URL}/courses/${courseId}`, { students: updatedStudents });
      } else {
        // Если это преподаватель, добавляем его в массив `teachers`
        const updatedTeachers = [...course.teachers, user];
        await axios.patch(`${API_BASE_URL}/courses/${courseId}`, { teachers: updatedTeachers });
      }
    } catch (error) {
      console.error("Error adding user to course:", error);
    }
  }
  
  async deleteUserFromCourse(
    courseId: string,
    userId: string,
    userType: "students" | "teachers"
  ) {
    try {
      // Получаем текущие данные курса
      const { data: course } = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
  
      if (userType === "students") {
        // Фильтруем массив студентов, исключая указанного студента
        const updatedStudents = course.students.filter((student: UserIntersection) => student.id !== userId);
        await axios.patch(`${API_BASE_URL}/courses/${courseId}`, { students: updatedStudents });
      } else if (userType === "teachers") {
        // Фильтруем массив преподавателей, исключая указанного преподавателя
        const updatedTeachers = course.teachers.filter((teacher: UserIntersection) => teacher.id !== userId);
        await axios.patch(`${API_BASE_URL}/courses/${courseId}`, { teachers: updatedTeachers });
      }
    } catch (error) {
      console.error("Error deleting user from course:", error);
    }
  }

  async getCourses() {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  }

  async updateCourseStatus(
    courseId: string,
    status: "черновик" | "архивный" | "активный"
  ) {
    await axios.patch(`${API_BASE_URL}/courses/${courseId}`, { status });
  }
}
