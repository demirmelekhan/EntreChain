import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for demonstration (in production, use a database)
const userWallets = new Map<string, { keyIdBase64: string; contractId: string }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { keyId } = req.query;

    if (!keyId || typeof keyId !== 'string') {
      return res.status(400).json({ error: 'Valid keyId parameter is required' });
    }

    const walletInfo = userWallets.get(keyId);
    
    if (walletInfo) {
      return res.status(200).json(walletInfo);
    } else {
      return res.status(404).json({ error: 'Wallet not found' });
    }
  } catch (error) {
    console.error('Get wallet error:', error);
    return res.status(500).json({ error: 'Failed to get wallet' });
  }
}
