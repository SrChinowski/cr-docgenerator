import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import { nacionalidades } from '../helpers/arrays';
import { DatePicker, Radio, Space } from 'antd';
import img1 from '../assets/img/img1.svg'
import moment from 'moment';
import 'moment/locale/es';

const config = {
    path: './regularizacion-rp-refugiado.docx',
    fileName: 'regularizacion-rp-refugiado.docx'
}

const RegularizacionRPporRCR = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const [name, setname] = useState('');
    const [gender, setgender] = useState(1);
    const [place, setplace] = useState(1);
    const [nacionalidad, setnacionalidad] = useState('');
    const [ref_id, setref_id] = useState('');
    const [address, setaddress] = useState('');
    const [fecha, setfecha] = useState('');

    const handlevalue = (type, value) => {
        switch(type) {
            case 'name': setname(value); break;
            case 'gender': setgender(value); break;
            case 'place': setplace(value); break;
            case 'national': setnacionalidad(value); break;
            case 'ref_id': setref_id(value); break;
            case 'address': setaddress(value); break;
            default:  break
        }
    }

    const handleDate = (date, dateString) => {
        setfecha(date);
      }

    const generateDocument = () => {
        loadFile(
          config.path,
          function (error, content) {
            if (error) {
              throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater(zip, {
              paragraphLoop: true,
              linebreaks: true,
            });
            moment.locale('es');
            doc.setData({
              name: name.toUpperCase(),
              gender: gender === 1 ? 'El' : 'La',
              place: place === 1 ? 'Ciudad' : 'Estado',
              country: nacionalidad.toUpperCase(),
              date: `${moment(fecha).format('DD')} de ${moment(fecha).format('MMMM')} del ${moment(fecha).format('YYYY')}`,
              ref_id:ref_id,
              today: `${moment().format('DD')} de ${moment().format('MMMM')} del ${moment().format('YYYY')}`,
              address: address,
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
            saveAs(out, config.fileName);
          }
        );
    };

    const loadFile = (url, callback) => {
        PizZipUtils.getBinaryContent(url, callback);
    }

    const makeDocs = () => {
        generateDocument()
    }

    return ( 
        <AppLayout title={'Regularización de Residente por Reconocimiento de Refugiado'}>
            <Row>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className='d-flex flex-column justify-content-center'>
                    <Form>
                    <Row className='mb-3'>
                        <Col>
                          <p className='mb-1 form-label'>Género</p>
                          <Radio.Group onChange={({target}) => handlevalue('gender', target.value)} value={gender}>
                              <Space direction="vertical">
                              <Radio value={1}>Hombre</Radio>
                              <Radio value={2}>Mujer</Radio>
                              </Space>
                          </Radio.Group>
                          </Col>
                          <Col>
                              <p className='mb-1 form-label'>Lugar del escrito</p>
                              <Radio.Group onChange={({target}) => handlevalue('place', target.value)} value={place}>
                                  <Space direction="vertical">
                                  <Radio value={1}>Ciudad de México</Radio>
                                  <Radio value={2}>Estado de México</Radio>
                                  </Space>
                              </Radio.Group>
                          </Col>
                      </Row>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" 
                                placeholder="Nombre Apellido" 
                                onChange={({target}) => handlevalue('name', target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Nacionalidad</Form.Label>
                            <Form.Select type="text"
                                placeholder="Nacionalidad" 
                                onChange={({target}) => handlevalue('national', target.value)}
                            >
                                {nacionalidades.map( i => {
                                    return <option value={i.name}>{i.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>No. Constancia de Reconocimiento</Form.Label>
                            <Form.Control type="text"
                                placeholder="ref_id" 
                                onChange={({target}) => handlevalue('ref_id', target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control as="textarea" rows={2} 
                                onChange={({target}) => handlevalue('address', target.value)}
                            />
                        </Form.Group>
                        <Col>
                            <p className='m-0 mb-1'>Fecha de reconocimiento de condición</p>
                            <DatePicker className='w-100' format={dateFormatList} 
                                onChange={handleDate}
                            />
                        </Col>
                    </Form>

                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} className='justify-content-center d-flex'>
                    <img style={{width: '70%'}}  src={img1} alt="111" srcset="" />
                </Col>
            </Row>
            <Row className='mt-5 d-flex justify-content-center'>
                <Col lg={{offset: 3, span: 5}}>
                    <Button onClick={makeDocs} variant='primary'>Generar Archivo</Button>
                </Col>
            </Row>
        </AppLayout>
     );
}
 
export default RegularizacionRPporRCR;