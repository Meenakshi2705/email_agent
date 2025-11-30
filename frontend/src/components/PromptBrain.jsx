import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PromptBrain({ apiBase, onPromptsSaved }) {
  const [prompts, setPrompts] = useState({ categorization: '', actionItemExtraction: '', autoReplyDraft: '' });

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await axios.get(`${apiBase}/api/prompts`);
    setPrompts(res.data);
  }

  async function save() {
    await axios.post(`${apiBase}/api/prompts`, prompts);
    alert('Saved');
    onPromptsSaved();
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Prompt Brain</h4>
      <div>
        <label>Categorization</label>
        <textarea rows={3} style={{ width: '100%' }} value={prompts.categorization} onChange={e => setPrompts({ ...prompts, categorization: e.target.value })} />
      </div>
      <div>
        <label>Action Item Extraction</label>
        <textarea rows={3} style={{ width: '100%' }} value={prompts.actionItemExtraction} onChange={e => setPrompts({ ...prompts, actionItemExtraction: e.target.value })} />
      </div>
      <div>
        <label>Auto Reply Draft</label>
        <textarea rows={3} style={{ width: '100%' }} value={prompts.autoReplyDraft} onChange={e => setPrompts({ ...prompts, autoReplyDraft: e.target.value })} />
      </div>
      <button onClick={save}>Save Prompts</button>
    </div>
  );
}
