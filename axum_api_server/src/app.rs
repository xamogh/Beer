use crate::config::Config;
use clap::Parser;
use sqlx::{postgres::PgPoolOptions, PgPool};

pub async fn init() -> PgPool {
    dotenv::dotenv().ok();
    tracing_subscriber::fmt::init();

    let config = Config::parse();

    let db = PgPoolOptions::new()
        .max_connections(50)
        .connect(&config.database_url)
        .await
        .unwrap();

    sqlx::migrate!().run(&db).await.unwrap();

    db
}
