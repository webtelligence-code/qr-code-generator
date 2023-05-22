import { QRCodeSVG } from 'qrcode.react';
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Image, Table } from 'react-bootstrap';
import LoadingBars from './utility/LoadingBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode';
import PDFTable from './PDFTable';
import { pdf } from '@react-pdf/renderer';

const CustomTable = ({ users, activeFilter, qrCodeSize }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    // Check if the users data is ready and if so, set Loading state to false
    if (activeFilter === 'ALL' ? users.length > 0 : Object.values(users).some(arr => arr.length > 0)) {
      setLoading(false);
    }
  }, [users, activeFilter]);

  const generateQRCodeForPDF = async text => {
    try {
      let url = await QRCode.toDataURL(text);
      return url;
    } catch (err) {
      console.error('Failed to generate QRCode for PDF:', err);
    }
  }

  const generatePDF = async (header, userData) => {

    const usersDataWithQRCode = [];
    for (const user of userData) {
      const qrCodeImageUrl = await generateQRCodeForPDF(user.NAME);
      usersDataWithQRCode.push({
        NAME: user.NAME,
        EMPRESA: user.EMPRESA,
        DEPARTAMENTO: user.DEPARTAMENTO,
        FUNCAO: user.FUNCAO,
        qrCodeData: qrCodeImageUrl,
      });
    }

    const blob = await pdf(<PDFTable header={header} userData={usersDataWithQRCode} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${header}.pdf`;
    link.click();

    // Cleanup - URL.revokeObjectURL needs to be called when the blob URL isn't needed any more
    URL.revokeObjectURL(url);
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
          <Image
            src='qr-code-generator/assets/img/pdf-download-2.png'
            onClick={() => generatePDF('Utilizadores', users)}
            height={40}
            alt='download-pdf'
            style={{ cursor: 'pointer', padding: 0 }}
          />

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
      {users.length > 0 && Object.keys(users).map((KEY, key) => {
        if (!Array.isArray(users[KEY])) {
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
              <Image
                src='qr-code-generator/assets/img/pdf-download-2.png'
                onClick={() => generatePDF(KEY, users[KEY])}
                height={40}
                alt='download-pdf'
                style={{ cursor: 'pointer', padding: 0 }}
              />
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