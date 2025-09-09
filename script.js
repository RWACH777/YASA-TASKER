document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('job-form');
  const list = document.getElementById('job-list');

  async function fetchJobs() {
    try {
      const res = await fetch('/api/jobs');
      return await res.json();
    } catch (e) {
      console.error('Failed to fetch jobs', e);
      return [];
    }
  }

  async function render() {
    list.innerHTML = '';
    const jobs = await fetchJobs();
    if (!jobs || jobs.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No jobs yet. Add one using the form.';
      list.appendChild(li);
      return;
    }
    jobs.forEach((j) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${j.title}</strong> — <em>${j.budget} Pi</em><br>${j.desc}`;
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('job-title').value.trim();
    const budget = document.getElementById('job-budget').value.trim();
    const desc = document.getElementById('job-desc').value.trim();
    if (!title || !budget || !desc) return alert('Fill all fields');

    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, budget, desc })
    });

    form.reset();
    await render();
  });

  render();
});
