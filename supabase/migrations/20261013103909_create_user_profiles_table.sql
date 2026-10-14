create table user_profiles (
  id uuid primary key references auth.users (id),
  email text not null,
  bio text,
  display_name text not null,
  created_at timestamptz default now()
);

alter table public.user_profiles enable row level security;

create policy "Lectura publica de perfiles"
  on public.user_profiles
  for select
  to anon, authenticated
  using (true);

create policy "Insercion de perfil propio"
  on public.user_profiles
  for insert
  to authenticated
  with check (auth.uid() = id);