import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from './AppNavbar';

const AppLayout = ({children, title}) => {
    return ( 
        <Fragment className='w-100 h-100'>
            <AppNavbar/>
            <Container className='p-5 pt-3 w-100'>
                <h4 style={{color: 'gray'}}>{title}</h4>
                <hr style={{width: '100%', color: 'black'}}/>
                {children}
            </Container>
        </Fragment>
     );
}
 
export default AppLayout;