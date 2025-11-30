import React from 'react';

export default function InboxList({ emails = [], onSelect }) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3>Inbox</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {emails.map(e => (
          <li key={e.id} style={{ padding: 10, borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => onSelect(e.id)}>
            <div style={{ fontWeight: 600 }}>{e.sender}</div>
            <div>{e.subject}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{new Date(e.timestamp).toLocaleString()}</div>
            <div style={{ marginTop: 6, display: 'inline-block', padding: '2px 8px', background: '#f0f0f0', borderRadius: 12 }}>{e.category || '—'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
