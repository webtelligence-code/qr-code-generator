import { Document, Font, Image, Page, StyleSheet, Text, View,  } from '@react-pdf/renderer';
import React from 'react'
import ArialBold from '../fonts/ARIALBD.TTF';

Font.register({ family: 'Arial Bold', src: ArialBold });

const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  titleLabel: {
    fontSize: 16,
  },
  attentionLabel: {
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginBottom: 20
  },
  nameColumn: { width: '30%' },
  userIcarColumn: { width: '40%' },
  funcaoColumn: { width: '20%' },
  qrCodeColumn: { width: '10%' },
  row: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: '#262626',
    borderBottomStyle: "solid",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  qrCodeLabel: {
    flex: 1,
    fontSize: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center', // Center the label horizontally
  },
  qrCodeImage: {
    width: 50, // Adjust the width as desired
    height: 50, // Adjust the height as desired
    objectFit: 'contain'
  },
  boldText: {
    fontFamily: 'Arial Bold',
    fontWeight: 'bold',
  },
  header: { backgroundColor: '#f6f7f8' },
});

const PDFTable = ({ header, userData }) => {
  const MAX_ROWS_PER_PAGE = 8; // Maximum rows per page

  // Split the user data into chunks of rows based on the maximum rows per page
  const chunkedUserData = [];
  if (userData) {
    for (let i = 0; i < userData.length; i += MAX_ROWS_PER_PAGE) {
      const chunk = userData.slice(i, i + MAX_ROWS_PER_PAGE);
      chunkedUserData.push(chunk);
    }
  }

  return (
    <Document>
      {chunkedUserData.map((chunk, pageIndex) => (
        <Page key={pageIndex} size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.titleContainer}>
            <Text style={pdfStyles.title}>{header}</Text>
            <Text style={pdfStyles.attentionLabel}>
              Atenção: Apontar Scanner diretamente para o QRCode.
            </Text>
          </View>
          <View style={pdfStyles.table}>
            <View style={[pdfStyles.row, pdfStyles.header]}>
              <Text style={[pdfStyles.cell, pdfStyles.nameColumn]}>Nome</Text>
              <Text style={[pdfStyles.cell, pdfStyles.userIcarColumn]}>UserICar</Text>
              <Text style={[pdfStyles.cell, pdfStyles.funcaoColumn]}>Função</Text>
              <View style={[pdfStyles.cell, pdfStyles.qrCodeColumn, pdfStyles.qrCodeLabel]}>
                <Text>QRCode</Text> {/* Centered QRCode label */}
              </View>
            </View>

            {chunk.map((user, index) => (
              <View style={[pdfStyles.row, { paddingVertical: 18 }]} key={index}>
                <Text style={[pdfStyles.cell, pdfStyles.nameColumn]}>
                  <Text style={pdfStyles.boldText}>{user.nameDisplay}</Text>
                </Text>
                <View style={[pdfStyles.cell, pdfStyles.userIcarColumn]}>
                  {user.userIcar.split(';').map((icar, icarIndex) => (
                    <Text key={icarIndex}>{icar}</Text>
                  ))}
                </View>
                <Text style={[pdfStyles.cell, pdfStyles.funcaoColumn]}>{user.funcao}</Text>
                <Image style={[pdfStyles.cell, pdfStyles.qrCodeColumn, pdfStyles.qrCodeImage]} src={user.qrCodeData} />
              </View>
            ))}
          </View>
        </Page>
      ))
      }
    </Document >
  );
};


export default PDFTable;
