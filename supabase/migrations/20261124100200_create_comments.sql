create table public.comments (
  id bigint generated always as identity primary key,
  post_id bigint not null references posts (id) on delete cascade,
  user_id uuid not null references user_profiles (id),
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "Lectura publica de comentarios"
  on public.comments
  for select
  to anon, authenticated
  using (true);

create policy "Insercion de comentarios propios"
  on public.comments
  for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "Eliminacion de comentarios propios"
  on public.comments
  for delete
  to authenticated
  using (user_id = (select auth.uid()));
