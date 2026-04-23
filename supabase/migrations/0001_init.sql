-- Tecnolog One · schema inicial
-- Cumplimiento: ISP Decreto Exento N° 25/2026 · sin PII clínica · auditoría de versión de fórmulas

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  specialty text check (specialty in ('Imagenología', 'Radioterapia', 'Ecografía', 'Otro')),
  hospital text,
  region text default 'Chile',
  is_premium boolean default false,
  created_at timestamptz default now() not null
);

-- Trigger para crear profile al registrarse
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- HISTORIAL DE CÁLCULOS (anónimo, sin datos de paciente)
-- ============================================================
create table public.calculation_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  calculator_type text not null,
  calculator_version text not null,
  inputs jsonb not null,
  result jsonb not null,
  created_at timestamptz default now() not null
);

create index idx_calc_history_user on public.calculation_history(user_id, created_at desc);
create index idx_calc_history_type on public.calculation_history(calculator_type);

-- ============================================================
-- GUÍAS TÉCNICAS (JSON offline-first)
-- ============================================================
create table public.guides (
  id uuid default uuid_generate_v4() primary key,
  category text not null check (category in ('rayos', 'tac', 'rm')),
  title text not null,
  slug text unique not null,
  content jsonb not null,
  is_premium boolean default false,
  updated_at timestamptz default now() not null
);

create index idx_guides_category on public.guides(category);
create index idx_guides_premium on public.guides(is_premium);

-- ============================================================
-- FORO
-- ============================================================
create table public.forum_posts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  title text not null,
  content text not null,
  category text check (category in ('tips', 'protocolos', 'casos', 'nomenclatura')),
  likes_count integer default 0 not null,
  created_at timestamptz default now() not null
);

create index idx_posts_category on public.forum_posts(category, created_at desc);

create table public.forum_comments (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.forum_posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  content text not null,
  created_at timestamptz default now() not null
);

create index idx_comments_post on public.forum_comments(post_id, created_at);

create table public.forum_likes (
  post_id uuid references public.forum_posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (post_id, user_id)
);

-- ============================================================
-- CONTENIDO PREMIUM (Solarem)
-- ============================================================
create table public.premium_content (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  title text not null,
  content jsonb not null,
  external_link text,
  updated_at timestamptz default now() not null
);

-- ============================================================
-- AUDITORÍA DE FÓRMULAS (ISP)
-- ============================================================
create table public.formula_versions (
  id uuid default uuid_generate_v4() primary key,
  calculator_type text not null,
  version text not null,
  source text,
  notes text,
  published_at timestamptz default now() not null,
  unique (calculator_type, version)
);

insert into public.formula_versions (calculator_type, version, source, notes) values
  ('ckd-epi-2021', 'CKD-EPI-2021-race-free-v1', 'NKF/ASN Task Force 2021', 'Sin factor raza, recomendado LatAm'),
  ('cockcroft-gault', 'CockcroftGault-1976-v1', 'Cockcroft & Gault 1976', 'Clásica, requiere peso real'),
  ('contraste-adulto', 'Contraste-Adulto-2026-v1', 'SERAM/ACR + práctica LatAm', 'Ajuste por eGFR, rango 50-150 mL'),
  ('volumen-vejiga', 'Vejiga-Elipsoide-v1', 'Fórmula elipsoide estándar', '0.52 × L × A × H'),
  ('eqd2', 'EQD2-LQ-v1', 'Modelo lineal cuadrático', 'D × (d + α/β) / (2 + α/β)'),
  ('bmi', 'BMI-WHO-v1', 'OMS', 'Clasificación bajo/normal/sobrepeso/obesidad'),
  ('bsa', 'BSA-Mosteller-v1', 'Mosteller 1987', '√((peso × altura) / 3600)'),
  ('conv-creatinina', 'Conv-Creatinina-v1', 'Conversión estándar', 'factor 88.4');

-- ============================================================
-- LOG DE USO (auditoría agregada, sin PII)
-- ============================================================
create table public.usage_log (
  id bigint generated always as identity primary key,
  user_id uuid references public.profiles(id) on delete set null,
  event text not null,
  payload jsonb,
  created_at timestamptz default now() not null
);

create index idx_usage_log_user on public.usage_log(user_id, created_at desc);

-- ============================================================
-- RLS
-- ============================================================
alter table public.profiles enable row level security;
alter table public.calculation_history enable row level security;
alter table public.guides enable row level security;
alter table public.forum_posts enable row level security;
alter table public.forum_comments enable row level security;
alter table public.forum_likes enable row level security;
alter table public.premium_content enable row level security;
alter table public.formula_versions enable row level security;
alter table public.usage_log enable row level security;

-- profiles
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- calculation_history (solo dueño)
create policy "calc_history_all_own" on public.calculation_history for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- guides (lectura: gratuitas públicas, premium solo premium)
create policy "guides_public_free" on public.guides for select using (is_premium = false);
create policy "guides_premium_read" on public.guides for select using (
  is_premium = true and exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.is_premium = true
  )
);

-- forum (lectura pública, escritura autenticada)
create policy "posts_select_all" on public.forum_posts for select using (true);
create policy "posts_insert_auth" on public.forum_posts for insert with check (auth.role() = 'authenticated' and auth.uid() = user_id);
create policy "posts_update_own" on public.forum_posts for update using (auth.uid() = user_id);
create policy "posts_delete_own" on public.forum_posts for delete using (auth.uid() = user_id);

create policy "comments_select_all" on public.forum_comments for select using (true);
create policy "comments_insert_auth" on public.forum_comments for insert with check (auth.role() = 'authenticated' and auth.uid() = user_id);
create policy "comments_delete_own" on public.forum_comments for delete using (auth.uid() = user_id);

create policy "likes_all_own" on public.forum_likes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- premium_content (solo premium)
create policy "premium_read_sub" on public.premium_content for select using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_premium = true)
);

-- formula_versions (lectura pública, inmutable desde app)
create policy "formulas_read_all" on public.formula_versions for select using (true);

-- usage_log (insert propio)
create policy "usage_insert_own" on public.usage_log for insert with check (auth.uid() = user_id);
create policy "usage_select_own" on public.usage_log for select using (auth.uid() = user_id);

-- ============================================================
-- REALTIME (foro)
-- ============================================================
alter publication supabase_realtime add table public.forum_posts;
alter publication supabase_realtime add table public.forum_comments;
