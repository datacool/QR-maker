import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { saveAs } from 'file-saver';

const logoImage = '/logo.jpg';

interface LinkInput {
  id: number;
  value: string;
  label?: string;
}

const QRCodeGenerator = () => {
  const [links, setLinks] = useState<LinkInput[]>([
    { id: 1, value: '' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRefs = useRef<Map<number, HTMLCanvasElement>>(new Map());

  const addLink = () => {
    if (links.length >= 10) {
      alert('최대 10개까지 추가할 수 있습니다.');
      return;
    }
    const newId = Math.max(...links.map(l => l.id), 0) + 1;
    setLinks([...links, { id: newId, value: '' }]);
  };

  const removeLink = (id: number) => {
    if (links.length === 1) {
      alert('최소 1개의 링크가 필요합니다.');
      return;
    }
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: number, value: string) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, value } : link
    ));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('링크가 복사되었습니다!');
    });
  };

  const downloadQRCode = async (id: number, url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRefs.current.get(id);
      if (!canvas) {
        reject(new Error('Canvas not found'));
        return;
      }

      // QR 코드가 완전히 생성될 때까지 대기
      generateQRCode(canvas, url)
        .then(() => {
          canvas.toBlob((blob) => {
            if (blob) {
              const fileName = url
                ? `${url.replace(/^https?:\/\//, '').replace(/[^a-z0-9]/gi, '_').substring(0, 50)}.png`
                : `qrcode_${id}.png`;
              saveAs(blob, fileName);
              resolve();
            } else {
              reject(new Error('Failed to create blob'));
            }
          });
        })
        .catch(reject);
    });
  };

  const generateAllQRCodes = async () => {
    const validLinks = links.filter(link => link.value.trim() !== '');
    
    if (validLinks.length === 0) {
      alert('최소 1개의 링크를 입력해주세요.');
      return;
    }

    setIsGenerating(true);

    try {
      // 각 QR 코드를 순차적으로 생성 및 다운로드
      for (const link of validLinks) {
        await downloadQRCode(link.id, link.value);
        // 다운로드 간 약간의 지연
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      alert(`${validLinks.length}개의 QR 코드가 다운로드되었습니다!`);
    } catch (error) {
      console.error('QR 코드 생성 중 오류:', error);
      alert('QR 코드 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateQRCode = async (
    canvas: HTMLCanvasElement,
    url: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = 256;
      canvas.height = 256;

      // 흰색 배경
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 256, 256);

      // QR 코드 생성 (로고 공간 확보를 위해 errorCorrectionLevel을 높임)
      QRCode.toCanvas(canvas, url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      }, async (error) => {
        if (error) {
          reject(error);
          return;
        }

        // 로고 이미지 로드 및 배치
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        
        logoImg.onload = () => {
          const logoSize = 60;
          const centerX = (256 - logoSize) / 2;
          const centerY = (256 - logoSize) / 2;
          const centerRadius = logoSize / 2 + 6;

          // 로고 주변에 흰색 원형 배경 (QR 코드를 덮음)
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(128, 128, centerRadius, 0, Math.PI * 2);
          ctx.fill();

          // 로고 이미지 그리기
          ctx.drawImage(logoImg, centerX, centerY, logoSize, logoSize);

          resolve();
        };

        logoImg.onerror = () => {
          reject(new Error('Logo image failed to load'));
        };

        logoImg.src = logoImage;
      });
    });
  };


  // 링크 값이 변경될 때마다 QR 코드 재생성
  useEffect(() => {
    links.forEach((link) => {
      if (link.value.trim()) {
        const canvas = canvasRefs.current.get(link.id);
        if (canvas) {
          generateQRCode(canvas, link.value).catch((error) => {
            console.error('QR 코드 생성 오류:', error);
          });
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links.map(l => `${l.id}:${l.value}`).join('|')]); // 링크 값들만 추적

  const renderQRCode = (link: LinkInput) => {
    if (!link.value.trim()) {
      return (
        <div className="w-64 h-64 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-400 text-sm">링크를 입력하세요</p>
        </div>
      );
    }

    return (
      <canvas
        ref={(el) => {
          if (el) {
            canvasRefs.current.set(link.id, el);
            // 초기 렌더링 시 QR 코드 생성
            if (link.value.trim()) {
              generateQRCode(el, link.value).catch((error) => {
                console.error('QR 코드 생성 오류:', error);
              });
            }
          } else {
            canvasRefs.current.delete(link.id);
          }
        }}
        className="w-64 h-64 border-2 border-gray-200 rounded-lg bg-white"
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="space-y-4">
        {links.map((link, index) => (
          <div
            key={link.id}
            className="border-2 border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">
                링크 {index + 1}
              </label>
              {links.length > 1 && (
                <button
                  onClick={() => removeLink(link.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  삭제
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={link.value}
                onChange={(e) => updateLink(link.id, e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              {link.value && (
                <button
                  onClick={() => copyToClipboard(link.value)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  복사
                </button>
              )}
            </div>

            <div className="flex justify-center pt-4 border-t border-gray-200">
              {renderQRCode(link)}
            </div>
          </div>
        ))}

        <div className="flex gap-3 pt-4">
          {links.length < 10 && (
            <button
              onClick={addLink}
              className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              + 추가
            </button>
          )}
          <button
            onClick={generateAllQRCodes}
            disabled={isGenerating || links.filter(l => l.value.trim()).length === 0}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            {isGenerating ? '생성 중...' : '생성'}
          </button>
        </div>

        {links.length >= 10 && (
          <p className="text-center text-sm text-gray-500">
            최대 10개까지 추가할 수 있습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
