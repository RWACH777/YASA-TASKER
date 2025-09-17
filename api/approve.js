// api/approve.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId } = req.body || {};
    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId required' });
    }

    // Log the incoming request so you can see it in Vercel logs
    console.log('[API] approve request received for paymentId:', paymentId);

    // === STUB: Replace this with real Pi server approval logic later ===
    // For now respond with a success stub so frontend flow continues.
    return res.status(200).json({
      ok: true,
      paymentId,
      message: 'Server received approval request (stub).'
    });
  } catch (err) {
    console.error('[API] approve error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
