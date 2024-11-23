import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../App.css';
function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <Slider {...settings}>
          <div className="slide">
            <img src="https://via.placeholder.com/800x400" alt="Slide 1" />
            <h3>Slide 1</h3>
            <p>Описание первого слайда.</p>
          </div>
          <div className="slide">
            <img src="https://via.placeholder.com/800x400" alt="Slide 2" />
            <h3>Slide 2</h3>
            <p>Описание второго слайда.</p>
          </div>
          <div className="slide">
            <img src="https://via.placeholder.com/800x400" alt="Slide 3" />
            <h3>Slide 3</h3>
            <p>Описание третьего слайда.</p>
            <button onClick={() => navigate('/registration')}>Регистрация</button>
            <button onClick={() => navigate('/auto')}>Авторизация</button>
          </div>
        </Slider>
      </header>
    </div>
  );
}

export default App;