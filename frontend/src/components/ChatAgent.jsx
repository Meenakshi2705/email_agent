import React, { useState } from 'react';
import axios from 'axios';

export default function ChatAgent({ emailId, apiBase }) {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState('');

  async function ask(action) {
    if (!emailId) { alert('Select an email'); return; }
    setLog((l) => [...l, { role: 'user', text: `${action}: ${input}` }]);
    const payload = { email_id: emailId, action, instruction: input, tone: 'friendly' };
    const res = await axios.post(`${apiBase}/api/agent/query`, payload);
    setLog((l) => [...l, { role: 'assistant', text: JSON.stringify(res.data.result, null, 2) }]);
    setInput('');
  }

  return (
    <div style={{ marginTop: 10 }}>
      <h4>Email Agent</h4>
      <textarea rows={2} style={{ width: '100%' }} value={input} onChange={e => setInput(e.target.value)} placeholder="Add instruction (optional)" />
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <button onClick={() => ask('summarize')}>Summarize</button>
        <button onClick={() => ask('tasks')}>What tasks?</button>
        <button onClick={() => ask('draft')}>Draft Reply</button>
      </div>
      <div style={{ marginTop: 12 }}>
        {log.map((m, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#666' }}>{m.role}</div>
            <pre style={{ background: '#f8f8f8', padding: 8 }}>{m.text}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
