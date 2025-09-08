document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('job-form');
  const list = document.getElementById('job-list');

  const load = () => JSON.parse(localStorage.getItem('jobs') || '[]');
  const save = (jobs) => localStorage.setItem('jobs', JSON.stringify(jobs));

  const render = () => {
    list.innerHTML = '';
    const jobs = load();
    if (jobs.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No jobs yet. Add one using the form.';
      list.appendChild(li);
      return;
    }
    jobs.forEach((j, idx) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${j.title}</strong> — <em>${j.budget} Pi</em><br>${j.desc}`;
      const del = document.createElement('button');
      del.textContent = 'Remove';
      del.style.marginTop = '6px';
      del.onclick = () => {
        const updated = load().filter((_, i) => i !== idx);
        save(updated);
        render();
      };
      li.appendChild(document.createElement('br'));
      li.appendChild(del);
      list.appendChild(li);
    });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('job-title').value.trim();
    const budget = document.getElementById('job-budget').value.trim();
    const desc = document.getElementById('job-desc').value.trim();
    if (!title || !budget || !desc) return;
    const jobs = load();
    jobs.push({ title, budget, desc, createdAt: Date.now() });
    save(jobs);
    form.reset();
    render();
  });

  render();
});
