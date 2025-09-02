"use client";
import React, { useState, useEffect } from "react";
import { LayoutDashboard, ArrowLeftRight, History, User, Wallet2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Name, Identity, Address, Avatar, EthBalance } from "@coinbase/onchainkit/identity";
import { useAccount, useDisconnect } from "wagmi";


const MobileNavbarTelegram = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showWalletPopup, setShowWalletPopup] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "swap",
      label: "Swap",
      href: "/swap",
      icon: ArrowLeftRight,
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "history",
      label: "History",
      href: "/history",
      icon: History,
      color: "from-blue-400 to-blue-600",
    },
  ];

  useEffect(() => {
    const found = navItems.find((item) => pathname.startsWith(item.href));
    setActiveTab(found ? found.id : "dashboard");
  }, [pathname]);

  const handleWalletClick = () => {
    setShowWalletPopup(!showWalletPopup);
  };

  const closeWalletPopup = () => {
    setShowWalletPopup(false);
  };

  const handleDisconnect = () => {
    disconnect();
    closeWalletPopup();
  };

  return (
    <>
      {/* Spacer untuk mencegah konten tertutup navbar - sesuaikan height sesuai kebutuhan */}
      <div className="h-24" />

      {/* Bottom Navigation Bar - Fixed di bawah */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-2xl w-full z-[9999] bg-gray-950/95 border-t rounded-t-xl border-cyan-500/30 shadow-2xl">
        {/* Glow effect line di atas */}
        <div className="absolute -top-px left-0 right-0 h-px" />

        <div className="relative px-4 py-2 safe-area-pb">
          <div className="grid grid-cols-4">
            {/* Navigation Tabs */}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 active:scale-95"
                >
                  {/* Background effect untuk tab aktif */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-transparent rounded-xl"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon Container dengan efek */}
                  <div
                    className={`relative flex items-center justify-center mb-1 transition-all duration-300 ${
                      isActive ? "scale-110" : "scale-100 hover:scale-105"
                    }`}
                  >
                    {/* Glow Effect untuk icon aktif */}
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur-sm opacity-10 "
                      />
                    )}

                    {/* Icon dengan background */}
                    <div
                      className={`relative p-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "shadow-md shadow-blue-500/25"
                          : "bg-gray-800/50 hover:bg-gray-800"
                      }`}
                    >
                      <Icon
                        size={22}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-blue-400 shadow-md"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>
                  </div>

                  {/* Label text */}
                  <span
                    className={`text-xs font-medium transition-all duration-300 mt-1 ${
                      isActive
                        ? "text-cyan-300 drop-shadow-lg font-semibold"
                        : "text-gray-500 hover:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Wallet Connect di kanan */}
            <div className="flex flex-col items-center justify-center py-2 px-3">
              <button
                onClick={handleWalletClick}
                className="relative flex flex-col items-center justify-center transition-all duration-300 active:scale-95"
              >
                <div className="relative flex items-center justify-center mb-1">
                  {/* Glow Effect untuk wallet connected */}
                  {isMounted && isConnected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur-sm opacity-40 animate-pulse" />
                  )}
                  
                  <div className={`relative p-2.5 rounded-full transition-all duration-300 ${
                    isMounted && isConnected 
                      ? "shadow-md shadow-blue-500/25 bg-gray-800/50 hover:bg-gray-800" 
                      : "bg-gray-800/50 hover:bg-gray-800"
                  }`}>
                    <Wallet2
                      size={22}
                      className={`transition-all duration-300 ${
                        isMounted && isConnected
                          ? "text-blue-400 drop-shadow-lg"
                          : "text-blue-400 hover:text-blue-300"
                      }`}
                      strokeWidth={isMounted && isConnected ? 2.5 : 2}
                    />
                  </div>
                </div>
                <span className={`text-xs font-medium transition-all duration-300 mt-1 ${
                  isMounted && isConnected
                    ? "text-blue-400"
                    : "text-blue-400 hover:text-blue-300"
                }`}>
                  {isMounted && isConnected ? "Connected" : "Connect"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Extra shadow untuk depth */}
        <div className="absolute inset-x-0 -top-4 h-4 pointer-events-none" />
      </nav>

      {/* Wallet Connect Popup */}
      {showWalletPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeWalletPopup}
          />
          
          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-gray-900 border border-blue-500/30 rounded-2xl p-6 w-80 max-w-[90vw] shadow-2xl shadow-blue-500/20 z-[101]"
          >
            {/* Close button */}
            <button
              onClick={closeWalletPopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-transparent border-2 border-blue-800 rounded-full flex items-center justify-center">
                <Wallet2 className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isMounted && isConnected ? "Wallet Connected" : "Connect Wallet"}
              </h3>
              <p className="text-gray-400 text-sm">
                {isMounted && isConnected ? "Manage your wallet connection" : "Choose your preferred wallet to connect"}
              </p>
            </div>

            {/* Wallet Connection */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {isMounted && isConnected ? (
                <div className="flex flex-col items-center justify-center w-full">
                  {/* Wallet Info */}
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4 w-full">
                    <div className="text-blue-400 text-sm font-medium text-center flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      Wallet Connected Successfully
                    </div>
                  </div>
                  
                  {/* Wallet Identity */}
                  <div className="w-full flex justify-center mb-6">
                    <Identity className="px-4 pt-3 pb-2 bg-gray-800/50 rounded-lg" hasCopyAddressOnClick>
                      <Avatar />
                      <Name />
                      <Address />
                      <EthBalance />
                    </Identity>
                  </div>

                  {/* Disconnect Button */}
                  <button
                    onClick={handleDisconnect}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="w-full flex justify-center">
                    <Wallet>
                      <ConnectWallet className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 active:scale-95">
                        <span>Connect Wallet</span>
                      </ConnectWallet>
                      <WalletDropdown>
                        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                          <Avatar />
                          <Name />
                          <Address />
                          <EthBalance />
                        </Identity>
                        <WalletDropdownDisconnect />
                      </WalletDropdown>
                    </Wallet>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs text-center">
                By connecting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default MobileNavbarTelegram;