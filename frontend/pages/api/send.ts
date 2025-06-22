import type { NextApiRequest, NextApiResponse } from 'next';

// Passkey server instance - gerçek implementasyonu passkeyServer.ts'den import edilecek
// import { server } from '../../lib/passkeyServer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { xdr } = req.body;

    if (!xdr) {
      return res.status(400).json({ error: 'XDR is required' });
    }

    // TODO: Güvenlik kontrolü - sadece geçerli dapp transactionlarına izin ver
    // Bu production için kritik bir güvenlik önlemidir!
    
    // Şimdilik mock response - gerçek implementasyon için passkeyServer entegrasyonu gerekli
    // const result = await server.send(xdr);
    
    const mockResult = {
      status: 'success',
      hash: 'mock_transaction_hash',
      xdr: xdr
    };

    return res.status(200).json(mockResult);
  } catch (error) {
    console.error('Transaction send error:', error);
    return res.status(500).json({ 
      error: 'Failed to send transaction',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
