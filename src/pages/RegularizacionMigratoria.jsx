import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';

import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
  }

const RegularizacionMigratoria = () => {
    const [name, setname] = useState('');
    const [nacionalidad, setnacionalidad] = useState('');
    const [curp, setcurp] = useState('');
    const [fecha, setfecha] = useState('');

    const handlevalue = (type, value) => {
        switch(type) {
            case 'name': setname(value); break;
            case 'national': setnacionalidad(value); break;
            case 'curp': setcurp(value); break;
            case 'date': setfecha(value); break;
            default:  break
        }
    }

    const generateDocument = () => {
        loadFile(
          './info_request.docx',
          function (error, content) {
            if (error) {
              throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });
            doc.setData({
              name: name,
              country: nacionalidad,
              phone: curp,
              initial_date: fecha,
              documentacion: fecha,
            });
            try {
              // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
              doc.render();
            } catch (error) {
              // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
              function replaceErrors(key, value) {
                if (value instanceof Error) {
                  return Object.getOwnPropertyNames(value).reduce(function (
                    error,
                    key
                  ) {
                    error[key] = value[key];
                    return error;
                  },
                  {});
                }
                return value;
              }
              console.log(JSON.stringify({ error: error }, replaceErrors));
  
              if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                  .map(function (error) {
                    return error.properties.explanation;
                  })
                  .join('\n');
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
              }
              throw error;
            }
            var out = doc.getZip().generate({
              type: 'blob',
              mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            }); //Output the document using Data-URI
            saveAs(out, 'solicitud_de_estatus_de_PRCR.docx');
          }
        );
      };



    const makeDocs = () => {
        generateDocument()
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
            <Row className='mt-5 d-flex justify-content-center'>
                <Col lg={{offset: 3, span: 5}}>
                    <Button onClick={makeDocs} variant='primary'>Generar Archivo</Button>
                </Col>
            </Row>
        </AppLayout>
     );
}

//nacionalidad
//Domiciio
//CURP
//FECHA DE constancia 
 
export default RegularizacionMigratoria;