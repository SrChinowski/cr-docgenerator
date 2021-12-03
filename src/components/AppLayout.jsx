import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from './AppNavbar';

const AppLayout = ({children, title}) => {
    return ( 
        <Fragment className='w-100 h-100'>
            <AppNavbar/>
            <Container className='p-5 pt-3 w-100 m-0'>
                <h3>{title}</h3>
                <hr style={{width: '100%', color: 'black'}}/>
                {children}
            </Container>
        </Fragment>
     );
}
 
export default AppLayout;