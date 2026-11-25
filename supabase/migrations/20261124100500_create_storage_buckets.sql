insert into storage.buckets (id, name, public)
values
  ('post-images', 'post-images', true),
  ('avatars', 'avatars', true);

create policy "Lectura publica de imagenes"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id in ('post-images', 'avatars'));

create policy "Subida de imagenes propias"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id in ('post-images', 'avatars')
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );

create policy "Eliminacion de imagenes propias"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id in ('post-images', 'avatars')
    and (select auth.uid())::text = (storage.foldername(name))[1]
  );
