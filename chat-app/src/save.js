import { saveAs } from 'file-saver';

export const exportHistory = (messages) => {
  const json = JSON.stringify(messages);
  const blob = new Blob([json], { type: 'application/json' });
  saveAs(blob, 'chat_history.json');
};

export const importHistory = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const importedMessages = JSON.parse(event.target.result);
    setMessages(importedMessages);
  };
  reader.readAsText(file);
};
