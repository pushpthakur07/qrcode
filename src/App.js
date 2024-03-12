import './App.css';
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const imageInputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    const svg = document.querySelector('svg'); // Select the SVG element
    const svgData = new XMLSerializer().serializeToString(svg); // Convert SVG to string
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img');

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData); // Encode SVG data to base64
  };

  return (
    <div className="app-container">
      <h1>QR Code Generator and Scanner</h1>

      <div className="input-container">
        <label htmlFor="dataInput">Enter Data:</label>
        <input
          type="text"
          id="dataInput"
          value={inputData}
          onChange={handleInputChange}
          placeholder="Enter data for QR code"
        />
      </div>

      <div className="image-upload-container">
        <label htmlFor="imageInput">Upload Image:</label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageUpload}
        />
      </div>

      {inputData && (
        <div className="qrcode-container">
          {imageUrl && (
            <img className="background-image" src={imageUrl} alt="Background" />
          )}
          <QRCode
            value={inputData}
            size={256}
            renderAs={'svg'} // Render as SVG to allow for background image
            level={'H'}
            fgColor={'#000000'}
            bgColor={'#ffffff'}
          />
        </div>
      )}

      {inputData && (
        <button onClick={downloadQRCode}>Download QR Code</button>
      )}
    </div>
  );
};

export default App;