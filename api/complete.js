// api/complete.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, txid } = req.body || {};
    if (!paymentId || !txid) {
      return res.status(400).json({ error: 'paymentId and txid required' });
    }

    // Log the incoming request so you can see it in Vercel logs
    console.log('[API] complete request received:', { paymentId, txid });

    // === STUB: Replace this with real Pi server completion logic later ===
    return res.status(200).json({
      ok: true,
      paymentId,
      txid,
      message: 'Server received completion request (stub).'
    });
  } catch (err) {
    console.error('[API] complete error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
