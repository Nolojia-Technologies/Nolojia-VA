-- Blog posts table for Nolojia CMS
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  cover_image text,
  category text not null,
  tags text[] not null default '{}',
  author_name text not null default 'Nolojia Team',
  author_avatar text,
  published boolean not null default false,
  featured boolean not null default false,
  read_time_minutes int not null default 5,
  meta_title text,
  meta_description text,
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute procedure set_updated_at();

-- Indexes for common query patterns
create index if not exists blog_posts_slug_idx on blog_posts(slug);
create index if not exists blog_posts_published_idx on blog_posts(published, published_at desc);
create index if not exists blog_posts_category_idx on blog_posts(category, published_at desc);
create index if not exists blog_posts_featured_idx on blog_posts(featured, published_at desc);

-- Row Level Security: public can only read published posts
alter table blog_posts enable row level security;

create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

create policy "Service role has full access"
  on blog_posts for all
  using (auth.role() = 'service_role');
