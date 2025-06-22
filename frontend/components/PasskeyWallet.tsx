import { useState, useEffect } from 'react';

interface WalletInfo {
  keyIdBase64: string;
  contractId: string;
}

export default function PasskeyWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<WalletInfo | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  const createPasskeyWallet = async () => {
    setIsLoading(true);
    setError('');
    setStatus('Test cüzdanı oluşturuluyor...');

    try {
      // Basit test cüzdan oluşturma
      const mockKeyId = `passkey_${Date.now()}`;
      const mockContractId = `C${mockKeyId.slice(0, 40).toUpperCase().padEnd(56, '0')}`;
      
      const newWallet = { keyIdBase64: mockKeyId, contractId: mockContractId };
      setCurrentWallet(newWallet);
      
      setStatus('Test Passkey cüzdan oluşturuldu!');
      console.log('Test Wallet Created:', newWallet);
    } catch (err) {
      console.error('Wallet creation failed:', err);
      setError('Cüzdan oluşturulurken hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setStatus('Adres panoya kopyalandı!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔐 Passkey Cüzdan
        </h2>
        <p className="text-gray-600 text-sm">
          Şifresiz, güvenli blockchain cüzdanınız
        </p>
      </div>

      {/* Mevcut Cüzdan Bilgisi */}
      {currentWallet && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-800 mb-2">Aktif Cüzdan</h3>
          <div className="text-sm">
            <p className="text-gray-600 mb-1">Contract Address:</p>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs flex-1 overflow-hidden">
                {currentWallet.contractId}
              </code>
              <button
                onClick={() => copyToClipboard(currentWallet.contractId)}
                className="text-blue-600 hover:text-blue-800 text-xs"
                title="Panoya kopyala"
              >
                📋
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Durum Mesajları */}
      {status && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-800 text-sm">{status}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Ana Buton */}
      <div className="mb-4">
        <button
          onClick={createPasskeyWallet}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              İşlem Yapılıyor...
            </>
          ) : (
            <>
              ➕ Passkey Cüzdan Oluştur (Test)
            </>
          )}
        </button>
      </div>

      {/* Bilgi Notu */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 text-sm mb-1">
          💡 Passkey Nedir?
        </h4>
        <p className="text-gray-600 text-xs">
          Passkey, şifre gerektirmeyen güvenli kimlik doğrulama yöntemidir. 
          Parmak izi, yüz tanıma veya PIN ile cüzdanınıza erişebilirsiniz.
        </p>
        <p className="text-orange-600 text-xs mt-1">
          ⚠️ Bu basit bir test versiyonudur.
        </p>
      </div>
    </div>
  );
}
