import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react'

const pdfStyles = StyleSheet.create({
  page: { padding: 30 },
  table: { display: "table", width: "auto", marginBottom: 20 },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: '#bfbfbf', borderBottomStyle: "solid" },
  cell: { flex: 1, fontSize: 10, paddingVertical: 5, paddingHorizontal: 5 },
  header: { backgroundColor: '#f6f7f8' },
});

const PDFTable = ({ header, userData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text>{header}</Text>
      <View style={pdfStyles.table}>
        <View style={[pdfStyles.row, pdfStyles.header]}>
          <Text style={pdfStyles.cell}>Nome</Text>
          <Text style={pdfStyles.cell}>Empresa</Text>
          <Text style={pdfStyles.cell}>Departamento</Text>
          <Text style={pdfStyles.cell}>Função</Text>
          <Text style={pdfStyles.cell}>QRCode</Text>
        </View>

        {userData.map((user, index) => (
          <View style={pdfStyles.row} key={index}>
            <Text style={pdfStyles.cell}>{user.NAME}</Text>
            <Text style={pdfStyles.cell}>{user.EMPRESA}</Text>
            <Text style={pdfStyles.cell}>{user.DEPARTAMENTO}</Text>
            <Text style={pdfStyles.cell}>{user.FUNCAO}</Text>
            <Image style={pdfStyles.cell} src={user.qrCodeData} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFTable