import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmailView({ emailId, apiBase }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (emailId) fetchEmail(emailId);
  }, [emailId]);

  async function fetchEmail(id) {
    const res = await axios.get(`${apiBase}/api/emails/${id}`);
    setEmail(res.data);
  }

  if (!email) return <div>Select an email to view</div>;

  return (
    <div>
      <h2>{email.subject}</h2>
      <div style={{ color: '#666' }}>{email.sender} · {new Date(email.timestamp).toLocaleString()}</div>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#fafafa', padding: 10 }}>{email.body}</pre>

      <h4>Action Items</h4>
      {email.action_items && email.action_items.length ? (
        <ul>
          {email.action_items.map((a, i) => <li key={i}>{a.task} {a.deadline ? ` — ${a.deadline}` : ''}</li>)}
        </ul>
      ) : <div>No action items</div>}
    </div>
  );
}
