mod app;
mod beer;
mod config;
mod routes;
use std::net::SocketAddr;
use tower::ServiceBuilder;
use tower_http::ServiceBuilderExt;
use tracing;

#[tokio::main]
async fn main() -> Result<(), sqlx::Error> {
    let db = app::init().await;

    let middleware = ServiceBuilder::new().add_extension(db);

    let app = routes::routes().layer(middleware);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));

    tracing::debug!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    Ok(())
}
