// src/Home.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Home() {
  return (
    <div className="container opciones animate__animated animate__fadeInUp">
      <h2 className="text-center mb-4">Bienvenido al sistema de renta de autos</h2>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <a href="/autos" className="btn btn-primary">Registrar Auto</a>
        <a href="/clientes" className="btn btn-primary">Registrar Cliente</a>
        <a href="/rentas" className="btn btn-primary">Registrar Renta</a>
        <a href="/devoluciones" className="btn btn-primary">Registrar Devolución</a>
        <a href="/reparaciones" className="btn btn-primary">Registrar Reparación</a>
        <a href="/autos-disponibles" className="btn btn-success">Autos Disponibles</a>
      </div>

      <div className="custom-carousel animate__animated animate__zoomIn mt-4">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg"
              alt="Auto 1"
            />
            <Carousel.Caption className="custom-caption">
              <h3>Renta tu auto ideal</h3>
              <p>Con los mejores precios del mercado</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg"
              alt="Auto 1"
            />
            <Carousel.Caption className="custom-caption">
              <h3>Renta tu auto ideal</h3>
              <p>Con los mejores precios del mercado</p>
            </Carousel.Caption>
          </Carousel.Item><Carousel.Item>
            <img
              className="d-block w-100 carousel-img"
              src="https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg"
              alt="Auto 1"
            />
            <Carousel.Caption className="custom-caption">
              <h3>Renta tu auto ideal</h3>
              <p>Con los mejores precios del mercado</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Home;