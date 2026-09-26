-- Website enquiries for Romsey Reclamation. Run in the Supabase SQL editor (or `supabase db push`).
-- The site writes with the service role key from the server only; RLS is on with no public policies.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  postcode text,
  trade boolean not null default false,
  topic text,
  message text not null,
  items jsonb not null default '[]'::jsonb,   -- [{ name, qty }] from the enquiry list
  photos text[] not null default '{}',        -- paths in the enquiry-photos bucket
  source_page text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'replied', 'quoted', 'sold', 'closed'))
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

alter table public.enquiries enable row level security;

-- Private bucket for customer photos (matching samples, salvage for sale). View them from the Supabase dashboard.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('enquiry-photos', 'enquiry-photos', false, 4194304, array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'])
on conflict (id) do nothing;
