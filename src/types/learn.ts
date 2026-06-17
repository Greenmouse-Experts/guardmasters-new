import type { CourseContentMediaType, SingleCourse } from "./courses";

export interface LessonSub {
  id: string;
  title: string;
  duration: number;
  media: string;
  previewUrl: string | null;
  mediaType: CourseContentMediaType;
  order?: number;
  createdDate?: string;
}

export interface LessonSection {
  title: string;
  courseContentSubs: LessonSub[];
}

export interface CourseRead {
  id: string;
  createdDate: string;
  contentSub: LessonSub;
}

export interface AssessmentResult {
  score: number;
  total: number;
  percent: number;
  courseContentSub: LessonSub;
}

export interface CourseLearnResponse {
  course: SingleCourse;
  contents: {
    data: LessonSection[];
    total: number;
    totalDuration: number;
  };
  reads: CourseRead[];
  assessmentResults: AssessmentResult[];
}
