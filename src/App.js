
import './App.css';
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [scanned, setScanned] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const imageInputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
    setScanned(false); // Reset scanned status when input changes
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

      {inputData && !scanned && (
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
    </div>
  );
};
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
