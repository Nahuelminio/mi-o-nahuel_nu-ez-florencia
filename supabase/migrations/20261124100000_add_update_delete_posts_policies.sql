
create policy "Edicion de posts propios"
  on public.posts
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "Eliminacion de posts propios"
  on public.posts
  for delete
  to authenticated
  using (user_id = (select auth.uid()));
