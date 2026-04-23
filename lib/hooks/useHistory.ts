import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';
import type { CalculationHistory } from '../../types';
import type { CalcResult } from '../calculators';

export function useHistory(limit = 20) {
  return useQuery({
    queryKey: ['history', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('calculation_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as CalculationHistory[];
    },
  });
}

export function useSaveCalculation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      calculatorType,
      inputs,
      result,
    }: {
      calculatorType: string;
      inputs: Record<string, unknown>;
      result: CalcResult;
    }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return null;
      const { error } = await supabase.from('calculation_history').insert({
        user_id: user.id,
        calculator_type: calculatorType,
        calculator_version: result.version,
        inputs,
        result: result as unknown as Record<string, unknown>,
      });
      if (error) throw error;
      return true;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['history'] }),
  });
}
