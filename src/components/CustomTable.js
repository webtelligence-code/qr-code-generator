import { QRCodeSVG } from 'qrcode.react';
import React, { Fragment } from 'react'
import { Card, Table } from 'react-bootstrap';

const CustomTable = ({ users, activeFilter, qrCodeSize }) => {

  if (activeFilter === 'ALL') {
    return (
      <Card
        className='mb-3'
      >
        <Card.Header
          style={{
            backgroundColor: 'white',
            color: '#77321c',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
          as='h5'
        >
          Todos os utilizadores
        </Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr style={{ color: '#77321c', borderColor: '#77321c' }}>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Departamento</th>
                <th>Função</th>
                <th>QRCode</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 && users.map((user, key) => (
                <tr style={{ color: '#77321c', fontSize: 15 }} key={key}>
                  <td className='align-middle'>{user.NAME}</td>
                  <td className='align-middle'>{user.EMPRESA}</td>
                  <td className='align-middle'>{user.DEPARTAMENTO}</td>
                  <td className='align-middle'>{user.FUNCAO}</td>
                  <td className='align-middle'>
                    <QRCodeSVG
                      value={user.NAME}
                      size={qrCodeSize}
                      imageSettings={{
                        src: 'https://amatoscar.pt/assets/media/general/logoamatoscar.webp',
                        excavate: true
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Fragment>
      {Object.keys(users).map((KEY, key) => {
        if (!Array.isArray(users[KEY])) {
          console.error(`users[${KEY}] is not an array!`, users[KEY]);
          return null; // Skip this iteration.
        }

        return (
          <Card
            className='mb-3'
            key={key}
          >
            <Card.Header
              style={{
                backgroundColor: 'white',
                color: '#77321c',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
              as='h5'
            >
              {KEY}
            </Card.Header>
            <Card.Body>
              <Table hover responsive>
                <thead>
                  <tr style={{ color: '#77321c', borderColor: '#77321c' }}>
                    <th>Nome</th>
                    <th>Empresa</th>
                    <th>Departamento</th>
                    <th>Função</th>
                    <th>QRCode</th>
                  </tr>
                </thead>
                <tbody>
                  {users[KEY].map((user, key) => (
                    <tr style={{ color: '#77321c', fontSize: 15 }} key={key}>
                      <td className='align-middle'>{user.NAME}</td>
                      <td className='align-middle'>{user.EMPRESA}</td>
                      <td className='align-middle'>{user.DEPARTAMENTO}</td>
                      <td className='align-middle'>{user.FUNCAO}</td>
                      <td className='align-middle'>
                        <QRCodeSVG
                          value={user.NAME}
                          size={qrCodeSize}
                          imageSettings={{
                            src: 'https://amatoscar.pt/assets/media/general/logoamatoscar.webp',
                            excavate: true
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )
      })}
    </Fragment>
  )
}

export default CustomTable