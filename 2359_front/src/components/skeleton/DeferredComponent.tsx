/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect, PropsWithChildren } from 'react';

function DeferredComponent({ children }: PropsWithChildren<{}>) {
  const [isDeferred, setIsDeferred] = useState(false);
  useEffect(() => {
    // 200ms 지난 후 children Render
    const timeoutId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);
  if (!isDeferred) {
    return null;
  }
  return <>{children}</>;
}

export { DeferredComponent };
