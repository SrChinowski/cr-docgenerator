import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SolicitudDeInformacion from './pages/SolicitudDeInformacion';
import { ConfigProvider } from 'antd';
import es_ES from 'antd/lib/locale/es_ES'
import RegularizacionRHporII from './pages/RegularizacionRHporII';
import CambioCondicionVaRP from './pages/CambioCondicionVaRP';
import RegularizacionRPporRCR from './pages/RegularizacionRPporRCR';
import CambioDomicilio from './pages/CambioDomicilio';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={es_ES}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/solicitud-de-informacion" element={<SolicitudDeInformacion />} />
          <Route path="/regularizacion-rh-ii" element={<RegularizacionRHporII />} />
          <Route path="/cambio-visitante-rp" element={<CambioCondicionVaRP />} />
          <Route path="/regularizacion-rp-ref" element={<RegularizacionRPporRCR />} />
          <Route path="/cambio-domicilio" element={<CambioDomicilio />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
