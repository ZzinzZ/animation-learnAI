export interface Assignment {
    id: number;
    title: string;
    course: string;
    type: "exam" | "quiz" | "assignment";
    dueDate: string;
    status: "pending" | "completed" | "in-progress";
    points: number;
    duration?: string;
    description: string;
    questions?: number;
    attempts?: number;
    maxAttempts?: number;
    score?: number;
    submissionType?: string;
}

export interface Course {
    id: number,
    title: string,
    instructor: string,
    duration: string,
    students: number,
    rating: number,
    progress: number,
    thumbnail: string,
    description: string,
}