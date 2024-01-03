CREATE TABLE "public"."pix_keys" (
    id uuid not null,
    created_at timestamp with time zone not null,
    user_id uuid REFERENCES auth.users NOT NULL,
    pix_key text not null,
    constraint pix_keys_pkey primary key (id),
    constraint pix_keys_pix_key_key unique (pix_key)
  );


create table
  public.pix_requests (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default (now() at time zone 'utc'::text),
    user_id uuid not null,
    user_pix_key text not null,
    end_pix_key text not null,
    pix_amount numeric not null,
    end_pix_key_type text not null,
    constraint pix_requests_pkey primary key (id),
    constraint pix_requests_end_pix_key_type_key unique (end_pix_key_type),
    constraint pix_requests_user_id_fkey foreign key (user_id) references auth.users (id)
  ) tablespace pg_default;


  -- 2. Enable RLS
alter table pix_keys enable row level security;

-- 3. Create Policy
create policy "Usuários podem visualizar seus próprios user_id."
on pix_keys for select
using ( auth.uid() = user_id );