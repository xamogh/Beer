mod app;
mod beer;
mod config;
mod routes;
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::{cors::CorsLayer, ServiceBuilderExt};
use tracing;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let db = app::init().await;

    let middleware = ServiceBuilder::new().add_extension(db);

    let app = routes::routes()
        .layer(middleware)
        .layer(CorsLayer::permissive());

    let addr = SocketAddr::from(([127, 0, 0, 1], 5500));

    tracing::debug!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
