// src/Home.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Home() {
  return (
    <>
      {/* Encabezado principal */}
      <div className="text-center mt-5 animate__animated animate__fadeInDown">
        <h2 className="fw-bold display-5 mb-2" style={{ color: '#feffffff' }}>
           ¡Bienvenido a Renta de Autos!
        </h2>
        <p className="lead" style={{ color: '#ffffffcc' }}>
          Conduce hacia la libertad, comodidad y estilo.
        </p>
        <hr className="w-50 mx-auto" style={{ borderColor: '#f2fafcff' }} />
      </div>

      {/* Carrusel */}
      <div className="custom-carousel animate__animated animate__zoomIn mt-4">
        <Carousel fade indicators={true}>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg"
              alt="Auto 1"
            />
            <Carousel.Caption className="custom-caption">
              <h3>🚘 Renta tu auto ideal</h3>
              <p>Con los mejores precios del mercado</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://us.as.com/autos/wp-content/uploads/2024/02/honda-civic-hibrido-2024-04-1280x720-1-1024x576.jpg"
              alt="Auto 2"
            />
            <Carousel.Caption className="custom-caption">
              <h3>✨ Flota moderna y confiable</h3>
              <p>Modelos recientes listos para ti</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6B34/production/_94244472_9.jpg.webp"
              alt="Auto 3"
            />
            <Carousel.Caption className="custom-caption">
              <h3>🌎 Viaja donde quieras</h3>
              <p>Sin límites y sin preocupaciones</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Sección de beneficios */}
      <div className="container mt-5 mb-5 animate__animated animate__fadeInUp">
        <h3 className="text-center mb-4" style={{ color: '#f9fafaff' }}>¿Por qué elegirnos?</h3>
        <div className="row text-center text-light">
          <div className="col-md-3 mb-4">
            <div className="p-3 bg-dark rounded shadow">
              <h4>🚗 Variedad</h4>
              <p>Desde autos compactos hasta SUVs, elige el que más te convenga.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-3 bg-dark rounded shadow">
              <h4>💸 Precios accesibles</h4>
              <p>Planes flexibles para tu presupuesto.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-3 bg-dark rounded shadow">
              <h4>🛠️ Mantenimiento garantizado</h4>
              <p>Vehículos en perfecto estado.</p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="p-3 bg-dark rounded shadow">
              <h4>📞 Soporte 24/7</h4>
              <p>Estamos disponibles cuando nos necesites.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <div className="floating-button">
        <Link to="/autos" className="btn btn-outline-light">
          Ver autos disponibles
        </Link>
      </div>
    </>
  );
}

export default Home;
