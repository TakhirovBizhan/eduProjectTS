
import { v4 as uuidv4 } from 'uuid';



interface IUser {
    readonly id: string;
    name: string;
    email: string;

}

interface IStudent extends IUser {
    entranceYear: number;
}

interface ITeacher extends IUser {
    academicDegree: 'отсутствует' | 'к.н.' | 'д.н.'
}

export class User implements IUser {
    readonly id: string;
    name: string;
    email: string;
    constructor(name: string, email: string) { 
        this.id = uuidv4();
        this.name = name; 
        this.email = email; 
    }
}

export type UserIntersection = IStudent | ITeacher;

export class Teacher extends User implements ITeacher {
    academicDegree: 'отсутствует' | 'к.н.' | 'д.н.'
    constructor(name: string, email: string, academicDegree: 'отсутствует' | 'к.н.' | 'д.н.') {
        super(name, email);
        this.academicDegree = academicDegree;
    }
}

export class Student extends User implements IStudent {
    entranceYear: number;
    constructor(name: string, email: string, entranceYear: number) {
        super(name, email);
        this.entranceYear = entranceYear;
    }
}

 export class Course {
    public readonly id: string;
    public name: string;
    public limit: number | undefined;
    public status: 'черновик' | 'архивный' | 'активный';
    public students: IStudent[];
    public teachers: ITeacher[];
    constructor(
         name: string,
         limit: number | undefined, 
         status: 'черновик' | 'архивный' | 'активный'
    ) {
        this.id = uuidv4();
        this.name = name;
        this.limit = limit;
        this.status = status;
        this.students = [];
        this.teachers = [];
    }

     addUser(user: UserIntersection): void {
        if ('entranceYear' in user) {
            if(typeof this.limit === "number" && this.limit * this.teachers.length >= this.students.length){
                this.students.push(user)
            } else{
                throw new Error('Students reached the limit!')
            }
        } else {
            this.teachers.push(user)
        }
    }
    publicCourse(): void {
        this.status = 'активный'
    }
    archiveCourse(): void {
        this.status = 'архивный'
    }
}

//1

export const getInfo = (user: UserIntersection) => {
    if('entranceYear' in user){
        return `${user.name} ${user.entranceYear}`
    } else {
        return `${user.name} ${user.academicDegree}`
    }
}

//2

export function getAverageNumberOfStudents(courses: Course[]): number {
    let result = 0;
    courses.map(function(course) {
        result += course.students.length
    })

    return Math.round(result / courses.length)
}

//3

export const getAmountDoctorsOfScience = (courses: Course[]) => {
    let result = 0;
    courses.map(function(course) {
        course.teachers.map(function(teacher) {
            if(teacher.academicDegree === 'д.н.' || teacher.academicDegree === 'к.н.'){
                result ++
            }
        })
    })
    return result
}

//4

export const sortCourseUsers = (course: Course) => {
    const users: UserIntersection[] = [...course.students, ...course.teachers];
    return users.sort((a, b) => a.name > b.name ? 1 : -1)
}