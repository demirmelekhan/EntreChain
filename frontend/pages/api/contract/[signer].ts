import type { NextApiRequest, NextApiResponse } from 'next';
// Backend utils import - path'i projeye göre ayarlanmalı
// import { getUserWallet } from '../../../backend/src/utils';

// Passkey server instance - gerçek implementasyonu passkeyServer.ts'den import edilecek
// import { server } from '../../../lib/passkeyServer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { signer } = req.query;

    if (!signer || typeof signer !== 'string') {
      return res.status(400).json({ error: 'Valid signer parameter is required' });
    }    // Utils.ts'den kullanıcı wallet bilgisini al
    // const walletInfo = getUserWallet(signer);
    
    // if (walletInfo) {
    //   return res.status(200).send(walletInfo.contractId);
    // }

    // Eğer utils'te bulunamazsa, passkeyServer'dan dene
    // const contractId = await server.getContractId(signer);
    
    // Şimdilik mock response
    const mockContractId = `C${signer.slice(0, 56).padEnd(56, '0')}`;
    
    return res.status(200).send(mockContractId);
  } catch (error) {
    console.error('Contract lookup error:', error);
    return res.status(500).json({ 
      error: 'Failed to get contract ID',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
