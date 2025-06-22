import type { NextApiRequest, NextApiResponse } from 'next';

// In-memory storage for demonstration (in production, use a database)
const userWallets = new Map<string, { keyIdBase64: string; contractId: string }>();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Store wallet
    try {
      const { keyIdBase64, contractId } = req.body;

      if (!keyIdBase64 || !contractId) {
        return res.status(400).json({ error: 'keyIdBase64 and contractId are required' });
      }

      const walletInfo = { keyIdBase64, contractId };
      userWallets.set(keyIdBase64, walletInfo);
      
      console.log(`Stored wallet for key: ${keyIdBase64}`);
      return res.status(200).json({ success: true, message: 'Wallet stored successfully' });
    } catch (error) {
      console.error('Store wallet error:', error);
      return res.status(500).json({ error: 'Failed to store wallet' });
    }
  } else if (req.method === 'DELETE') {
    // Clear wallet(s)
    try {
      const { keyIdBase64 } = req.body;

      if (keyIdBase64) {
        userWallets.delete(keyIdBase64);
        console.log(`Cleared wallet for key: ${keyIdBase64}`);
      } else {
        userWallets.clear();
        console.log('Cleared all user wallets');
      }

      return res.status(200).json({ success: true, message: 'Wallet(s) cleared successfully' });
    } catch (error) {
      console.error('Clear wallet error:', error);
      return res.status(500).json({ error: 'Failed to clear wallet' });
    }
  } else if (req.method === 'GET') {
    // Get all wallets
    try {
      const wallets = Array.from(userWallets.values());
      return res.status(200).json(wallets);
    } catch (error) {
      console.error('Get wallets error:', error);
      return res.status(500).json({ error: 'Failed to get wallets' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
