import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { Guide, GuideCategory } from '../../types';

export function useGuides(category?: GuideCategory) {
  return useQuery({
    queryKey: ['guides', category ?? 'all'],
    queryFn: async () => {
      let q = supabase.from('guides').select('*').order('title');
      if (category) q = q.eq('category', category);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Guide[];
    },
    staleTime: 10 * 60_000,
  });
}

export function useGuide(slug: string | null) {
  return useQuery({
    queryKey: ['guides', 'slug', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('slug', slug!)
        .single();
      if (error) throw error;
      return data as Guide;
    },
  });
}
