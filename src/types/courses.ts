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

export interface SingleCourse {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  discount: number;
  isPublished: boolean;
  coverImage: string;
  createdDate: string;
  updatedDate: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    isActive: boolean;
    isSuspended: boolean;
    role: string;
    picture: string;
    address: string | null;
    facebookUrl: string | null;
    twitterUrl: string | null;
    linkedinUrl: string | null;
    bio: string | null;
    createdDate: string;
  };
  program: {
    id: string;
    title: string;
    isPublished: boolean;
    createdDate: string;
  };
  originalPriceFormat: string;
  discountPriceFormat: string | null;
  discountedPrice: string | null;
  discountFormat: string | null;
}
export interface CourseProgramSingle {
  contents: {
    data: Course[];
    total: number;
    duration: number;
  };
  course: SingleCourse;
}

export interface CourseComment {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  body: string;
  date: string;
}
