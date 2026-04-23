export type Sexo = 'M' | 'F';

export type Specialty = 'Imagenología' | 'Radioterapia' | 'Ecografía' | 'Otro';

export type GuideCategory = 'rayos' | 'tac' | 'rm';

export type ForumCategory = 'tips' | 'protocolos' | 'casos' | 'nomenclatura';

export interface Profile {
  id: string;
  full_name: string | null;
  specialty: Specialty | null;
  hospital: string | null;
  region: string;
  is_premium: boolean;
  created_at: string;
}

export interface CalculationHistory {
  id: string;
  user_id: string;
  calculator_type: string;
  inputs: Record<string, unknown>;
  result: Record<string, unknown>;
  created_at: string;
}

export interface Guide {
  id: string;
  category: GuideCategory;
  title: string;
  content: {
    angulacion?: string;
    kvp?: string;
    mas?: string;
    dfp?: string;
    colimacion?: string;
    criterios?: string[];
    imagen_url?: string;
    notas?: string;
  };
  is_premium: boolean;
  updated_at: string;
}

export interface ForumPost {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: ForumCategory | null;
  likes_count: number;
  created_at: string;
}

export interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}
