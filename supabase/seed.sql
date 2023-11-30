CREATE TABLE "public"."pix_keys" (
    id uuid not null,
    created_at timestamp with time zone not null,
    user_id uuid REFERENCES auth.users NOT NULL,
    pix_key text not null,
    constraint pix_keys_pkey primary key (id),
    constraint pix_keys_pix_key_key unique (pix_key),
  );