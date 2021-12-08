import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import AppNavbar from './components/AppNavbar';
import imgLogo from './assets/img/logoCR.png';
import img1 from './assets/img/city.svg'
import { Fade, Slide } from '@mui/material';


function App() {
  return (
    <Fragment className='w-100 h-100'>
        <AppNavbar/>
        <Fade in={true} timeout={1000}>
          <div>
            <Slide direction="up" in={true} timeout={1000}>
              <Container className='p-5 pt-3 w-100 d-flex flex-column align-items-center justify-content-center' style={{height: '90vh'}}>
                  <img src={img1} alt={''} style={{width: '70%'}}/>
                  <img src={imgLogo} alt={''} className='mb-3 mt-5'></img>
                  <h5 style={{color: 'gray'}} className='mb-0'>Generador de Documentos</h5>
                  <p className='m-0' style={{color: 'gray'}}>cl-v0.1</p>
              </Container>
            </Slide>
          </div>
        </Fade>
    </Fragment>
  );
}

export default App;
