export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

export interface SchoolPrice {
  basePrice: number;
  maxPrice: number;
  hasInstallment: boolean;
  installmentMonths: number | null;
  installmentFeeRate: number | null;
  subsidyAvailable: boolean;
}

export interface SchoolCurriculum {
  languages: string[];
  frameworks: string[];
  hasPortfolio: boolean;
  weeklyHours: number;
  totalHours: number;
  hasMentor: boolean;
}

export interface SchoolSupport {
  jobSupport: boolean;
  jobSupportDetail: string;
  mentorResponse: string;
  communityExists: boolean;
  supportHours: string;
}

export interface SchoolResults {
  jobChangeRate: number | null;
  satisfactionRate: number | null;
  graduatesCount: number | null;
}

export interface ReviewScore {
  curriculum: number;
  price: number;
  support: number;
  userReview: number;
}

export type SchoolPurpose = 'career' | 'side' | 'skill';
export type SchoolLevel = 'beginner' | 'intermediate' | 'advanced';
export type SchoolFormat = 'online' | 'offline' | 'hybrid';

export interface School {
  id: string;
  name: string;
  slug: string;
  logo: MicroCMSImage;
  officialUrl: string;
  affiliateUrl: string;
  catchphrase: string;
  description: string;
  price: SchoolPrice;
  curriculum: SchoolCurriculum;
  support: SchoolSupport;
  results: SchoolResults;
  format: SchoolFormat[];
  purpose: SchoolPurpose[];
  targetLevel: SchoolLevel[];
  freeTrial: boolean;
  freeTrialDetail?: string;
  pros: string[];
  cons: string[];
  reviewScore: ReviewScore;
  overallScore?: number;
  reviewCount: number;
  publishedAt: string;
  updatedAt: string;
  rank?: number;
}

export interface CompareColumn {
  key: keyof School | string;
  label: string;
  format?: (value: unknown, school: School) => string | number;
}

export interface FilterState {
  purpose: SchoolPurpose | null;
  level: SchoolLevel | null;
  format: SchoolFormat | null;
  maxPrice: number | null;
  freeTrial: boolean;
  subsidyAvailable: boolean;
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}
