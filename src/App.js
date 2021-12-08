import { Fragment } from 'react';
import { Col, Container } from 'react-bootstrap';
import './App.css';
import AppNavbar from './components/AppNavbar';
import imgLogo from './assets/img/logoCR.png';
import img1 from './assets/img/city.svg'


function App() {
  return (
    <Fragment className='w-100 h-100'>
            <AppNavbar/>
            <Container className='p-5 pt-3 w-100 d-flex align-items-center' style={{height: '90vh'}}>
                <Col className='ml-5'>
                  <img src={imgLogo} alt={''} className='mb-3'></img>
                  <h4 style={{color: 'gray'}} className='mb-0'>Generador de Documentos</h4>
                  <p className='m-0' style={{color: 'gray'}}>cl-v0.1</p>

                </Col>
                <Col>
                  <img src={img1} alt={''} style={{width: '100%'}}/>
                </Col>
            </Container>
        </Fragment>
  );
}

export default App;
