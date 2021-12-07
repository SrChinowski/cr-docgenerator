import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    return ( 
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">Casa Refugiados</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/regularizacion-migratoria">Regularización Migratoria</Nav.Link>
                    <Nav.Link href="#pricing">Documento 2</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
 
export default AppNavbar;