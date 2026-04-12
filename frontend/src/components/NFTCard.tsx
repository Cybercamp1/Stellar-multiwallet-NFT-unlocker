'use client';

import React from 'react';
import { NFT } from '@/types';
import { Lock, Unlock, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  nft: NFT;
  onUnlock: (id: string) => void;
  isLoading: boolean;
}

export default function NFTCard({ nft, onUnlock, isLoading }: Props) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all hover:shadow-purple-500/20"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.title}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            !nft.unlocked ? 'grayscale-[0.5] blur-[2px]' : ''
          }`}
        />
        
        {/* Overlay for Locked */}
        {!nft.unlocked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className="bg-black/60 p-4 rounded-full border border-white/20">
              <Lock className="text-white/80 w-8 h-8" />
            </div>
          </div>
        )}

        {/* Status Tag */}
        <div className="absolute top-4 right-4">
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2 backdrop-blur-xl shadow-2xl border ${
            nft.unlocked 
              ? 'bg-green-500/20 text-green-400 border-green-500/40' 
              : 'bg-red-500/20 text-red-400 border-red-500/40'
          }`}>
            {nft.unlocked ? <Unlock size={12} className="fill-current" /> : <Lock size={12} className="fill-current" />}
            {nft.unlocked ? 'UNLOCKED' : 'LOCKED'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{nft.title}</h3>
          <span className="text-purple-400 font-mono font-bold text-sm bg-purple-500/10 px-2 py-1 rounded-lg border border-purple-500/20">
            {nft.price}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">
          {nft.description}
        </p>

        {isLoading && (
          <div className="mb-4 flex items-center gap-2 justify-center animate-pulse">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              ⏳ Transaction Pending...
            </span>
          </div>
        )}

        {!nft.unlocked ? (
          <button
            onClick={() => onUnlock(nft.id)}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 group/btn"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Zap size={18} className="group-hover/btn:animate-pulse" />
                Unlock for {nft.price}
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3 bg-white/5 border border-white/10 text-gray-500 font-semibold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed"
          >
            <CheckCircle2 size={18} className="text-green-500" />
            Purchased
          </button>
        )}
      </div>
    </motion.div>
  );
}
