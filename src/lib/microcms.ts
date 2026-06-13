import { createClient } from 'microcms-js-sdk';
import type { School } from '@/types/school';
import type { MicroCMSListResponse, MicroCMSQueries } from '@/types/cms';

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
});

export async function getSchools(queries?: MicroCMSQueries): Promise<MicroCMSListResponse<School>> {
  return client.getList<School>({ endpoint: 'schools', queries });
}

export async function getSchool(contentId: string, queries?: MicroCMSQueries): Promise<School> {
  return client.getListDetail<School>({ endpoint: 'schools', contentId, queries });
}

export async function getAllSchoolSlugs(): Promise<string[]> {
  const data = await client.getList<School>({
    endpoint: 'schools',
    queries: { fields: 'slug', limit: 100 },
  });
  return data.contents.map((s) => s.slug);
}
