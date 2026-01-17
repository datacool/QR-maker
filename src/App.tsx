import QRCodeGenerator from './components/QRCodeGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          QR 코드 생성기
        </h1>
        <p className="text-center text-gray-600 mb-8">
          링크를 입력하고 로고가 포함된 QR 코드를 생성하세요
        </p>
        <QRCodeGenerator />
      </div>
    </div>
  );
}

export default App;
