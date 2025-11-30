import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DraftEditor({ apiBase }) {
  const [drafts, setDrafts] = useState([]);

  async function load() {
    // simple: read directly from sqlite by adding a lightweight endpoint later; for now, list not implemented
    // fallback: show message
    setDrafts([{ id: 'n/a', subject: 'Drafts are saved on backend; view via DB' }]);
  }
  useEffect(() => { load(); }, []);

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Drafts</h4>
      <div>
        {drafts.map(d => (
          <div key={d.id} style={{ background: '#fff', padding: 8, marginBottom: 6 }}>
            <div style={{ fontWeight: 600 }}>{d.subject}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{d.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
