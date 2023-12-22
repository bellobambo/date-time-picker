'use client'
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const generateQRCode = () => {
    // Validate the URL, add any additional validation as needed
    if (url.trim() === '') {
      alert('Please enter a valid URL');
      return;
    }

    // Create a data URL for the QR code
    const qrCodeDataURL = document.querySelector('canvas').toDataURL('image/png');

    // Create a download link
    const link = document.createElement('a');
    link.href = qrCodeDataURL;
    link.download = 'qrcode.png';
    link.click();

    // Optionally, you can set the download link in the component state
    setDownloadLink(qrCodeDataURL);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {downloadLink && <img src={downloadLink} alt="QR Code" style={{ display: 'none' }} />}
      <QRCode value={url} />
    </div>
  );
};

export default QRCodeGenerator;
