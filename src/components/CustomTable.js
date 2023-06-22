import { QRCodeSVG } from 'qrcode.react';
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Image, Table } from 'react-bootstrap';
import LoadingBars from './utility/LoadingBars';
import QRCode from 'qrcode';
import PDFTable from './PDFTable';
import { pdf } from '@react-pdf/renderer';

const CustomTable = ({ users, activeFilter, qrCodeSize }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    // Check if the users data is ready and if so, set Loading state to false
    if (Object.values(users).some(arr => arr.length > 0)) {
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
      const qrCodeImageUrl = await generateQRCodeForPDF(user.nameDisplay);
      usersDataWithQRCode.push({
        NAME: user.nameDisplay,
        EMPRESA: user.empresa,
        DEPARTAMENTO: user.departamento,
        FUNCAO: user.funcao,
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

  return (
    <Fragment>
      {Object.keys(users).map((KEY, key) => {
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
                src='https://webtelligence.pt/qr-code-generator/assets/img/pdf-download-2.png'
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
                    <th className='text-start'>Nome</th>
                    <th className='text-center'>Empresa</th>
                    <th className='text-center'>Concessão</th>
                    <th className='text-center'>Departamento</th>
                    <th className='text-center'>Função</th>
                    <th className='text-end'>QRCode</th>
                  </tr>
                </thead>
                {loading ? (
                  <LoadingBars />
                ) : (
                  <tbody>
                    {users[KEY].map((user, key) => (
                      <tr style={{ color: '#77321c', fontSize: 15 }} key={key}>
                        <td className='align-middle text-start'>{user.nameDisplay}</td>
                        <td className='align-middle text-center'>{user.empresa}</td>
                        <td className='align-middle text-center'>{user.concessao}</td>
                        <td className='align-middle text-center'>{user.departamento}</td>
                        <td className='align-middle text-center'>{user.funcao}</td>
                        <td className='align-middle text-end'>
                          <QRCodeSVG
                            value={user.nameDisplay}
                            size={qrCodeSize}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </Table>
            </Card.Body>
          </Card>
        )
      })}
    </Fragment>
  )
}

export default CustomTable