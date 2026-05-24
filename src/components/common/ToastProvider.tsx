import { useCallback, useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { Toast } from './Toast';
import type { ToastMessage } from '../../types/ui';
import { ToastContext } from './toast-context';
import type { NotifyArgs } from './toast-context';

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const notify = useCallback(({ title, description, variant = 'info' }: NotifyArgs) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 3500);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-[min(360px,90vw)] flex-col gap-3">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
