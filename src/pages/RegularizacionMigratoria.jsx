import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';

const RegularizacionMigratoria = () => {
    const [name, setname] = useState('');
    const [nacionalidad, setnacionalidad] = useState('');
    const [curp, setcurp] = useState('');
    const [fecha, setfecha] = useState('');

    const handlevalue = (type, value) => {
        console.log(value)
        switch(type) {
            case 'name': setname(value); break;
            case 'national': setnacionalidad(value); break;
            case 'curp': setcurp(value); break;
            case 'date': setfecha(value); break;
        }
    }


    const makeDocs = () => {
        alert(`${name} ${nacionalidad} ${curp} ${fecha}`)
    }
    return ( 
        <AppLayout title={'Regularización Migratoria'}>
            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Nombre Apellido" 
                            onChange={({target}) => handlevalue('name', target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Nacionalidad</Form.Label>
                        <Form.Control type="text"
                            placeholder="Nacionalidad" 
                            onChange={({target}) => handlevalue('national', target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>CURP</Form.Label>
                        <Form.Control type="text"
                            placeholder="CURP" 
                            onChange={({target}) => handlevalue('curp', target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Fecha de Constancia</Form.Label>
                        <Form.Control type="text"
                            placeholder="dd/mm/aaaa" 
                            onChange={({target}) => handlevalue('date', target.value)}
                        />
                    </Form.Group>
                </Form>
            </Col>
            <Row>
                <Button onClick={makeDocs} variant='primary'>Generar Archivo</Button>
            </Row>
        </AppLayout>
     );
}

//nacionalidad
//Domiciio
//CURP
//FECHA DE constancia 
 
export default RegularizacionMigratoria;