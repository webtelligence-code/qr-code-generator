import { QRCodeSVG } from 'qrcode.react';
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import LoadingBars from './utility/LoadingBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

const CustomTable = ({ users, activeFilter, qrCodeSize }) => {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Gerar PDF');

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
    setDisabled(true);
    setButtonLabel("A gerar PDF...");
    const doc = new jsPDF();
    const tableColumn = ['Nome', 'Empresa', 'Departamento', 'Função', 'QRCode'];
    const tableRows = [];

    for (const user of userData) {
      const qrCodeImageUrl = await generateQRCodeForPDF(user.NAME);
      const userData = [
        user.NAME,
        user.EMPRESA,
        user.DEPARTAMENTO,
        user.FUNCAO,
        { qrCodeData: qrCodeImageUrl }
      ];
      tableRows.push(userData);
    }

    doc.text(header, 14, 30);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 4) {
          const qrCodeData = data.cell.raw.qrCodeData;
          doc.addImage(qrCodeData, 'PNG', data.cell.x + 1, data.cell.y + 1, 25, 25);
        }
      },
      styles: { cellPadding: 1, minCellHeight: 30 }, // Adjust cell padding and minimum cell height
      headStyles: { fillColor: '#ed6337' }
    });

    doc.save(`${header}.pdf`)

    setDisabled(false);
    setButtonLabel('Download PDF');
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
            className='generate-pdf-button'
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