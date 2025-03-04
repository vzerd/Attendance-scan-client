import { useState, useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType} from 'html5-qrcode';
import Footer from './Footer';
import Header from './Header';

function QRCodeScanner() {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [scan, setScan] = useState(false);
  const [qrBoxColor, setQrBoxColor] = useState('bg-gray-400');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentSection, setStudentSection] = useState('');
  const [studentRoll, setStudentRoll] = useState('');
  let scanner, readJsonData;

  useEffect(() => {
    if (scan) {
      scanner = new Html5QrcodeScanner('reader',{
        fps: 60,
        qrbox: undefined,
        disableFlip: false,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
      });
      scanner.render(
        (result) => {
          try {
            readJsonData = JSON.parse(result);
          } catch (error) {
            console.error("Invalid JSON", error);
          }
          setStudentName(readJsonData.student_name);
          setStudentClass(readJsonData.class);
          setStudentSection(readJsonData.section);
          setStudentRoll(readJsonData.roll_no);
          setQrBoxColor('bg-green-500');
          setDataAvailable(true);
          setTimeout(() => setQrBoxColor(qrBoxColor), 800);
        },
        (error) => {

        }
      );
    }
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scan]);


  return (
    <>
      <div className="bg-gray-100 flex-grow">
        <div className="flex flex-col max-w-md mx-auto">
          <div className={`flex flex-col items-center justify-center rounded-md p-2 mt-10 ${qrBoxColor}`}>
            <div className="w-full max-w-md">
              <div className="p-2 ">
                {scan && <div id="reader" className="w-full mb-4"></div>}
                <div className="mt-4 flex justify-center gap-4">
                  {!scan && (<button className="bg-sky-600 text-white py-2 px-4 rounded" onClick={() => setScan(true)}>Start Scan</button>)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-4 bg-slate-300 rounded-md">
            {dataAvailable && <div className=" text-center w-full h-full">
              {/*<p className="text-xl">Scanned Result:</p>*/}
              <p className="text-lg">Student Name: {studentName}</p>
              <p className="text-lg">Student Class: {studentClass}</p>
              <p className="text-lg">Student Section: {studentSection}</p>
              <p className="text-lg">Student Roll: {studentRoll}</p>
            </div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default QRCodeScanner;