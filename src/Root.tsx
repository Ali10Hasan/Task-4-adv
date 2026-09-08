import React, { useState, useRef } from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | null; show: boolean }>({
    message: "",
    type: null,
    show: false
  });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type, show: true });
    
    // إذا كان هناك مؤقت شغال، نقوم بإلغائه حتى لا يختفي الإشعار الجدييد فجأة
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // ضبط مؤقت لتسعير الإشعار بعد 3 ثواني
    timerRef.current = setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 1550);
  };

  const alertStyle: React.CSSProperties = {
    width:"350px",
    height:"50px",
    position: 'fixed',
    top: '90px',
    left: '50%',
    transform: alert.show ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-20px)',
    padding: '15px 30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    // إعطاء ظل (Box Shadow) أحمر للايرور وأخضر للنجاح
    boxShadow: alert.type === 'error' ? '0 4px 15px rgba(255, 0, 0, 0.4)' : '0 4px 15px rgba(0, 128, 0, 0.4)',
    color: '#333',
    fontWeight: 'bold',
    zIndex: 9999,
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: alert.show ? 1 : 0,
    pointerEvents: alert.show ? 'auto' : 'none',
  };

  return (
    <div className="root">
        {/* ظهور الإشعار في أعلى المنتصف */}
        <div style={alertStyle}>
          {alert.message}
        </div>

        {/* تمرير دالة إظهار الإشعار لجميع الأبناء */}
        <Outlet context={{ showAlert }} />
    </div>
  )
}

export default Root