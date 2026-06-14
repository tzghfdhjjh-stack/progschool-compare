import { createClient } from 'microcms-js-sdk';
import type { School, MicroCMSImage, SchoolFormat, SchoolPurpose, SchoolLevel } from '@/types/school';
import type { MicroCMSListResponse, MicroCMSQueries } from '@/types/cms';
import { calcOverallScore } from './scoring';
import { SAMPLE_SCHOOLS } from './sample-data';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
});

interface CMSRaw {
  id: string;
  name: string;
  slug: string;
  logo: MicroCMSImage;
  officialUrl: string;
  affiliateUrl: string;
  catchphrase: string;
  description: string;
  basePrice: number;
  maxPrice?: number;
  hasInstallment?: boolean;
  installmentMonths?: number;
  installmentFeeRate?: number;
  subsidyAvailable?: boolean;
  totalHours?: number;
  hasMentor?: boolean;
  jobSupport?: boolean;
  jobSupportDetail?: string;
  mentorResponse?: string;
  supportHours?: string;
  jobChangeRate?: number;
  satisfactionRate?: number;
  graduatesCount?: number;
  format?: string;
  purpose?: string;
  targetLevel?: string;
  freeTrial?: boolean;
  freeTrialDetail?: string;
  pros?: string;
  cons?: string;
  curriculumScore: number;
  priceScore: number;
  supportScore: number;
  userReviewScore: number;
  reviewCount?: number;
  publishedAt: string;
  updatedAt: string;
}

function splitCSV<T extends string>(val?: string): T[] {
  if (!val) return [];
  return val.split(/[,、\n]/).map((s) => s.trim()).filter(Boolean) as T[];
}

function mapToSchool(raw: CMSRaw): School {
  const reviewScore = {
    curriculum: raw.curriculumScore,
    price: raw.priceScore,
    support: raw.supportScore,
    userReview: raw.userReviewScore,
  };
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    logo: raw.logo,
    officialUrl: raw.officialUrl,
    affiliateUrl: raw.affiliateUrl,
    catchphrase: raw.catchphrase,
    description: raw.description,
    price: {
      basePrice: raw.basePrice,
      maxPrice: raw.maxPrice ?? raw.basePrice,
      hasInstallment: raw.hasInstallment ?? false,
      installmentMonths: raw.installmentMonths ?? null,
      installmentFeeRate: raw.installmentFeeRate ?? null,
      subsidyAvailable: raw.subsidyAvailable ?? false,
    },
    curriculum: {
      languages: [],
      frameworks: [],
      hasPortfolio: false,
      weeklyHours: 0,
      totalHours: raw.totalHours ?? 0,
      hasMentor: raw.hasMentor ?? false,
    },
    support: {
      jobSupport: raw.jobSupport ?? false,
      jobSupportDetail: raw.jobSupportDetail ?? '',
      mentorResponse: raw.mentorResponse ?? '',
      communityExists: false,
      supportHours: raw.supportHours ?? '',
    },
    results: {
      jobChangeRate: raw.jobChangeRate ?? null,
      satisfactionRate: raw.satisfactionRate ?? null,
      graduatesCount: raw.graduatesCount ?? null,
    },
    format: splitCSV<SchoolFormat>(raw.format),
    purpose: splitCSV<SchoolPurpose>(raw.purpose),
    targetLevel: splitCSV<SchoolLevel>(raw.targetLevel),
    freeTrial: raw.freeTrial ?? false,
    freeTrialDetail: raw.freeTrialDetail,
    pros: splitCSV(raw.pros),
    cons: splitCSV(raw.cons),
    reviewScore,
    overallScore: calcOverallScore(reviewScore),
    reviewCount: raw.reviewCount ?? 0,
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
  };
}

export async function getSchools(queries?: MicroCMSQueries): Promise<MicroCMSListResponse<School>> {
  const raw = await client.getList<CMSRaw>({ endpoint: 'schools', queries });
  return { ...raw, contents: raw.contents.map(mapToSchool) };
}

export async function getSchool(contentId: string, queries?: MicroCMSQueries): Promise<School> {
  const raw = await client.getListDetail<CMSRaw>({ endpoint: 'schools', contentId, queries });
  return mapToSchool(raw);
}

export async function getAllSchoolSlugs(): Promise<string[]> {
  try {
    const data = await client.getList<CMSRaw>({
      endpoint: 'schools',
      queries: { fields: 'slug', limit: 100 },
    });
    if (data.contents.length === 0) return SAMPLE_SCHOOLS.map((s) => s.slug);
    return data.contents.map((s) => s.slug);
  } catch {
    return SAMPLE_SCHOOLS.map((s) => s.slug);
  }
}

export async function fetchSchools(queries?: MicroCMSQueries): Promise<School[]> {
  try {
    const { contents } = await getSchools(queries);
    return contents.length > 0 ? contents : SAMPLE_SCHOOLS;
  } catch {
    return SAMPLE_SCHOOLS;
  }
}

export async function fetchSchoolBySlug(slug: string): Promise<School | null> {
  try {
    const { contents } = await getSchools({ filters: `slug[equals]${slug}`, limit: 1 });
    if (contents.length > 0) return contents[0];
    return SAMPLE_SCHOOLS.find((s) => s.slug === slug) ?? null;
  } catch {
    return SAMPLE_SCHOOLS.find((s) => s.slug === slug) ?? null;
  }
}
