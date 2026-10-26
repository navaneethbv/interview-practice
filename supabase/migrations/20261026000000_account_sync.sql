-- Per-user practice snapshots for account sync. Apply with `supabase db push`
-- after `supabase link`, or paste once into the SQL editor. See docs/ACCOUNT_SYNC.md.
begin;

create table public.practice_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision uuid not null default gen_random_uuid(),
  updated_at timestamptz not null default now(),
  backup jsonb not null,
  constraint practice_snapshot_format check (coalesce((
    jsonb_typeof(backup) = 'object'
    and backup->>'format' = 'interview-practice'
    and backup->>'version' = '1'
    and jsonb_typeof(backup->'entries') = 'object'
    and jsonb_typeof(backup->'exportedAt') = 'string'
  ), false)),
  constraint practice_snapshot_size check (octet_length(backup::text) <= 20971520)
);

-- Server-owned revision prevents ABA (including delete/recreate) and forged old
-- revision reuse. REST updates/deletes still MUST filter expected revision.
create function public.practice_snapshot_stamp() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  new.revision := gen_random_uuid();
  new.updated_at := now();
  return new;
end;
$$;
revoke all on function public.practice_snapshot_stamp() from public, anon;
create trigger practice_snapshot_stamp before insert or update on public.practice_snapshots
  for each row execute function public.practice_snapshot_stamp();

alter table public.practice_snapshots enable row level security;
alter table public.practice_snapshots force row level security;
revoke all on public.practice_snapshots from public, anon;
grant select, insert, update, delete on public.practice_snapshots to authenticated;

create policy "read own practice" on public.practice_snapshots for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "insert own practice" on public.practice_snapshots for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "update own practice" on public.practice_snapshots for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own practice" on public.practice_snapshots for delete to authenticated
  using ((select auth.uid()) = user_id);

commit;
