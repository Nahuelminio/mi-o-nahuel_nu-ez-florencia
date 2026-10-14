CREATE TABLE public_chat_messages (
    id bigint primary key generated always as identity,
    email text not null,
    body text not null,
    created_at timestamptz default now()
);     