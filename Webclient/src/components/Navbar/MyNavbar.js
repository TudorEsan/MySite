import React from 'react'
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

function MyNavbar({ history }) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand onClick={() => history.push('/')}>Tudor Eșan</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => history.push('/contact')}>Contact</Nav.Link>
            <Nav.Link onClick={() => history.push('/blog')}>Blog</Nav.Link>
            
          </Nav>
        </Navbar>
      </>
    )
}

export default withRouter(MyNavbar)
