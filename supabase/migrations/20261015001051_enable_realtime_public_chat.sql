-- Habilitamos Realtime para el chat público:
-- agregamos la tabla a la "publication" que usa Supabase Realtime
-- para emitir los eventos de INSERT/UPDATE/DELETE.
alter publication supabase_realtime add table public.public_chat;
