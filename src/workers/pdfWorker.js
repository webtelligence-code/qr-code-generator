import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

self.onmessage = async (event) => {
  const { header, userData } = event.data;

  const generateQRCodeForPDF = async text => {
    try {
      let url = await QRCode.toDataURL(text);
      return url;
    } catch (err) {
      console.error('Failed to generate QRCode for PDF:', err);
    }
  }

  const generatePDF = async (header, userData) => {
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
  }

  const pdf = await generatePDF(header, userData);
  // Send the PDF back to the main thread
  self.postMessage({ pdf });
};