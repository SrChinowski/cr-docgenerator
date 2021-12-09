import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    return ( 
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Casa Refugiados</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/solicitud-de-informacion">Solicitud de Informacion</Nav.Link>
                    <Nav.Link href="/regularizacion-rh-ii">Regularización RH II</Nav.Link>
                    <Nav.Link href="/cambio-visitante-rp">Cambio Condición Visitante a RP</Nav.Link>
                    <Nav.Link href="/regularizacion-rp-ref">Regularización RP</Nav.Link>
                    <Nav.Link href="/cambio-domicilio">Cambio Domicilio</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default AppNavbar;