use axum::{extract::Extension, http::StatusCode, Json};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

#[derive(Serialize, Deserialize)]
pub struct CreateBeerRequest {
    name: String,
    genre: String,
    image: Option<String>,
    description: String,
}

#[derive(Serialize, Deserialize)]
pub struct BeerFromQuery {
    id: i64,
    created_at: DateTime<Utc>,
    name: String,
    genre: String,
    image: Option<String>,
    description: String,
}

pub async fn get_beers(
    Extension(db): Extension<PgPool>,
) -> Result<Json<Vec<BeerFromQuery>>, (StatusCode, String)> {
    let result = sqlx::query_as!(
        BeerFromQuery,
        "select id, name,genre, image, description, created_at from beer"
    )
    .fetch_all(&db)
    .await
    .map_err(internal_error)?;

    Ok(Json(result))
}

pub async fn create_beer(
    Json(req): Json<CreateBeerRequest>,
    Extension(db): Extension<PgPool>,
) -> Result<Json<BeerFromQuery>, (StatusCode, String)> {
    let beer = sqlx::query_as!(
        BeerFromQuery,
        r#"
            insert into beer (name, genre, description, image)
            values ($1, $2, $3, $4)
            returning id, name, genre, description, image, created_at
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

fn internal_error<E>(err: E) -> (StatusCode, String)
where
    E: std::error::Error,
{
    (StatusCode::INTERNAL_SERVER_ERROR, err.to_string())
}
