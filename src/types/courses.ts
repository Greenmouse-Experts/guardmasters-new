export interface Course {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  discount: number;
  isPublished: boolean;
  coverImage: string;
  createdDate: string;
  updatedDate: string;
}

export interface CourseProgram {
  id: string;
  title: string;
  isPublished: boolean;
  createdDate: string;
  courses: Course[];
}
