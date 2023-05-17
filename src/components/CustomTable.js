import { QRCodeSVG } from 'qrcode.react';
import QRCode from 'qrcode';
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import LoadingBars from './utility/LoadingBars';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

const CustomTable = ({ users, activeFilter, qrCodeSize }) => {
  const worker = new Worker('pdfWorker.js');
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Download PDF');

  useEffect(() => {
    setLoading(true)
    // Check if the users data is ready and if so, set Loading state to false
    if (activeFilter === 'ALL' ? users.length > 0 : Object.values(users).some(arr => arr.length > 0)) {
      setLoading(false);
    }
  }, [users, activeFilter]);

  worker.onmessage = (event) => {
    // This function will be called when the worker sends a message back to the main thread
    const { pdf } = event.data;
    
    setDisabled(false)
    setButtonLabel('Download PDF')
  }

  const generatePDF = async (header, userData) => {
    setDisabled(true);
    setButtonLabel("A gerar PDF");

    worker.postMessage({ header, userData})
  }

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
          <button
            onClick={() => generatePDF('Utilizadores', users)}
            className='ms-2'
            disabled={disabled}
          >
            {buttonLabel}
            <FontAwesomeIcon
              className='ms-2'
              icon={faFilePdf}
            />
          </button>
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
              {loading ? (<LoadingBars />) : (
                users.length > 0 && users.map((user, key) => (
                  <tr style={{ color: '#77321c', fontSize: 15 }} key={key}>
                    <td className='align-middle'>{user.NAME}</td>
                    <td className='align-middle'>{user.EMPRESA}</td>
                    <td className='align-middle'>{user.DEPARTAMENTO}</td>
                    <td className='align-middle'>{user.FUNCAO}</td>
                    <td className='align-middle'>
                      <QRCodeSVG
                        value={user.NAME}
                        size={qrCodeSize}
                      />
                    </td>
                  </tr>
                ))
              )}
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
              <button
                onClick={() => generatePDF(KEY, users[KEY])}
                className='ms-2'
                disabled={disabled}
              >
                {buttonLabel}
                <FontAwesomeIcon className='ms-2' icon={faFilePdf} />
              </button>
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
                  {loading ? (
                    <LoadingBars />
                  ) : (
                    users[KEY].map((user, key) => (
                      <tr style={{ color: '#77321c', fontSize: 15 }} key={key}>
                        <td className='align-middle'>{user.NAME}</td>
                        <td className='align-middle'>{user.EMPRESA}</td>
                        <td className='align-middle'>{user.DEPARTAMENTO}</td>
                        <td className='align-middle'>{user.FUNCAO}</td>
                        <td className='align-middle'>
                          <QRCodeSVG
                            value={user.NAME}
                            size={qrCodeSize}
                          />
                        </td>
                      </tr>
                    ))
                  )}
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