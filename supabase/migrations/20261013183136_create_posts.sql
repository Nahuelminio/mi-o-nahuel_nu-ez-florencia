create table public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null references user_profiles (id),  
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "Lectura publica de posts"
  on public.posts
  for select
  to anon, authenticated
  using (true);

create policy "Insercion de posts propios"
  on public.posts
  for insert
  to authenticated
  with check (auth.uid() = user_id);