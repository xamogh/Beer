use crate::beer::{create_beer, get_beers};
use axum::{routing::get, Router};

pub fn routes() -> Router {
    return Router::new().route("/api/beer", get(get_beers).post(create_beer));
}
