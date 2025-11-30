import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InboxList from './components/InboxList';
import EmailView from './components/EmailView';
import PromptBrain from './components/PromptBrain';
import ChatAgent from './components/ChatAgent';
import DraftEditor from './components/DraftEditor';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function App() {
  const [emails, setEmails] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    fetchEmails();
  }, [reloadFlag]);

  async function fetchEmails() {
    const res = await axios.get(`${API}/api/emails`);
    setEmails(res.data);
  }

  return (
    <div style={{ display: 'flex', gap: 20, padding: 16, fontFamily: 'Arial, sans-serif' }}>
      <div style={{ flex: 1, maxWidth: 360 }}>
        <button onClick={async () => {
          await axios.post(`${API}/api/ingest/load-mock`);
          setReloadFlag((p) => p + 1);
        }}>Load Mock Inbox</button>
        <InboxList emails={emails} onSelect={setSelected} />
        <PromptBrain apiBase={API} onPromptsSaved={() => setReloadFlag((p) => p + 1)} />
      </div>

      <div style={{ flex: 2 }}>
        <EmailView emailId={selected} apiBase={API} />
      </div>

      <div style={{ flex: 1 }}>
        <ChatAgent emailId={selected} apiBase={API} />
        <DraftEditor apiBase={API} />
      </div>
    </div>
  );
}
