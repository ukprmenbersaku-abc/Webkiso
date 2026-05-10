export enum TechType {
  HTML = 'HTML',
  CSS = 'CSS',
  JS = 'JavaScript'
}

export interface ValidationResult {
  passed: boolean;
  feedback: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  tech: TechType;
  defaultCode: string;
  task: string;
  explanation: string; // AI生成ではなく静的な解説
  hints: string[];     // 詰まった時用のヒント
  validate: (code: string) => ValidationResult; // 正誤判定関数
}

export interface CourseModule {
  id: string;
  title: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}
