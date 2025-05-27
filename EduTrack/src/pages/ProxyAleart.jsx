import { useEffect } from 'react';

const ProxyAlert = ({ isProxyDetected }) => {
  useEffect(() => {
    if (isProxyDetected) {
      alert('Proxy detected');
    }
  }, [isProxyDetected]);

  return null;
};

// Usage example (within any component):
// <ProxyAlert isProxyDetected={true} />
export default ProxyAlert;