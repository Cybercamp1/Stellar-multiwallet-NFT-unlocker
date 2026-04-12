'use client';

import React from 'react';
import { useWallet } from './WalletProvider';
import { shortenAddress } from '@/utils/stellar';
import { Wallet, LogOut, ChevronDown, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { activeWallet, wallets, connect, disconnect, switchWallet } = useWallet();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-lg">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Stellar<span className="text-purple-400">Cats</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {!activeWallet ? (
            <button
              onClick={connect}
              className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Wallet size={18} />
              Connect Wallet
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                  {activeWallet.address.slice(0, 2)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs text-gray-400 leading-none">Connected</p>
                  <p className="text-sm font-medium">{shortenAddress(activeWallet.address)}</p>
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-[#121212] border border-white/10 rounded-2xl p-2 shadow-2xl"
                  >
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Switch Wallet
                    </div>
                    {wallets.map((w) => (
                      <button
                        key={w.address}
                        onClick={() => {
                          switchWallet(w.address);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors mb-1 flex items-center justify-between ${
                          activeWallet.address === w.address ? 'bg-purple-500/10 text-purple-400' : 'hover:bg-white/5'
                        }`}
                      >
                        <span>{shortenAddress(w.address)}</span>
                        {activeWallet.address === w.address && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                      </button>
                    ))}
                    <div className="h-px bg-white/5 my-2" />
                    <button
                      onClick={() => {
                        disconnect();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Disconnect
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
