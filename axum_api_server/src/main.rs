mod config;
use axum::{
    extract::Extension,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use clap::Parser;
use config::Config;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPoolOptions, PgPool};
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::ServiceBuilderExt;
use tracing;
use tracing_subscriber;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    dotenv::dotenv().ok();

    let config = Config::parse();

    let db = PgPoolOptions::new()
        .max_connections(50)
        .connect(&config.database_url)
        .await?;

    sqlx::migrate!().run(&db).await?;

    tracing_subscriber::fmt::init();

    let middleware = ServiceBuilder::new().add_extension(db);

    let app = Router::new()
        .route("/api/beer", get(get_beers).post(create_beer))
        .layer(middleware);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::debug!("listening on {}", addr);
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}

fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}

async fn get_beers(
    Extension(db): Extension<PgPool>,
) -> Result<Json<Vec<BeerFromQuery>>, (StatusCode, String)> {
    let result = sqlx::query_as!(
        BeerFromQuery,
        "select beer_id, name,genre, image, description from beer"
    )
    .fetch_all(&db)
    .await
    .map_err(internal_error)?;

    Ok(Json(result))
}

async fn create_beer(
    Json(req): Json<CreateBeerRequest>,
    Extension(db): Extension<PgPool>,
) -> Result<Json<BeerFromQuery>, (StatusCode, String)> {
    let beer = sqlx::query_as!(
        BeerFromQuery,
        r#"
            insert into beer (name, genre, description, image)
            values ($1, $2, $3, $4)
            returning beer_id, name, genre, description, image
        "#,
        req.name,
        req.genre,
        req.description,
        req.image
    )
    .fetch_one(&db)
    .await
    .map_err(internal_error)?;

    Ok(Json(beer))
}

#[derive(Serialize, Deserialize)]
struct CreateBeerRequest {
    name: String,
    genre: String,
    image: Option<String>,
    description: String,
}

#[derive(Serialize, Deserialize)]
struct BeerFromQuery {
    beer_id: i64,
    name: String,
    genre: String,
    image: Option<String>,
    description: String,
}
