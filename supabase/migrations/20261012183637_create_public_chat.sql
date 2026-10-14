-- Tabla del chat público.
-- id: clave primaria autoincremental (bigint que se genera solo).
-- email y body: texto del mensaje y de quién lo mandó.
-- created_at: fecha/hora de creación, se completa sola con el valor por defecto.
create table public.public_chat (
  id bigint generated always as identity primary key,
  email text not null,
  body text not null,
  created_at timestamptz not null default now()
);

-- Activamos Row Level Security en la tabla.
-- Con RLS activado y sin políticas, nadie (con la key anon) puede leer ni escribir.
alter table public.public_chat enable row level security;

-- Política de LECTURA: cualquiera puede ver los mensajes (chat público).
-- "using (true)" => ninguna fila se filtra, se ven todas.
create policy "Lectura publica de mensajes"
  on public.public_chat
  for select
  to anon, authenticated
  using (true);

-- Política de ESCRITURA: cualquiera puede enviar un mensaje.
-- "with check (true)" => se acepta cualquier fila nueva que se intente insertar.
create policy "Insercion publica de mensajes"
  on public.public_chat
  for insert
  to anon, authenticated
  with check (true);
