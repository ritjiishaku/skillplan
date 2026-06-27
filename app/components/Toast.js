'use client';

import { useEffect, useState } from 'react';
import { Info, CheckCircle, AlertCircle } from 'lucide-react';

const toastIcons = { info: Info, success: CheckCircle, error: AlertCircle };

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const origShowToast = window.showToast;
    window.showToast = (message, type = 'info') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
    return () => { window.showToast = origShowToast; };
  }, []);

  const IconComp = ({ type }) => {
    const Comp = toastIcons[type] || Info;
    return <Comp size={14} />;
  };

  return (
    <div className="toast-container" id="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <IconComp type={t.type} />
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
