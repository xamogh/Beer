create table "beer"
(
    id              bigserial primary key,
    name            text collate "case_insensitive" not null,
    genre           text collate "case_insensitive" not null,
    description     text                                           not null default '',
    image           text,
    created_at      timestamptz                                    not null default now(),
    updated_at      timestamptz
);

SELECT trigger_updated_at('"beer"');
