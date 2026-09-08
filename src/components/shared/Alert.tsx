import React from 'react';
import './Alert.css';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | null;
  show: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, type, show }) => {
  return (
    <div className={`custom-alert ${show ? 'show' : ''} ${type ? type : ''}`}>
      {message}
    </div>
  );
};

export default Alert;