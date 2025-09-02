"use client";

import React from "react";
import DesktopView from "./_components/DesktopView";
import MobileView from "./_components/MobileView";

export default function HomePage() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="w-full min-h-screen">
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
