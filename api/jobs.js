// api/jobs.js
// Simple in-memory jobs API for Vercel serverless functions (good for sandbox/testing)
let jobs = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const job = req.body;
    if (!job || !job.title) {
      return res.status(400).json({ error: 'Invalid job' });
    }
    const newJob = { id: Date.now(), ...job };
    jobs.push(newJob);
    return res.status(200).json({ message: 'Job added', jobs });
  } else if (req.method === 'GET') {
    return res.status(200).json(jobs);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
