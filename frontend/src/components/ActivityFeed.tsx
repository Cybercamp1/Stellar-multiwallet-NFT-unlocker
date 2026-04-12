'use client';

import React from 'react';
import { Activity } from '@/types';
import { shortenAddress } from '@/utils/stellar';
import { Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivityFeed({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 h-full flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="text-purple-400" size={20} />
          Live Activity
        </h2>
        <div className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[10px] font-bold border border-purple-500/20 uppercase tracking-widest">
          Stellar Testnet
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activities.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-10">
              <p className="text-sm italic">No recent transactions</p>
            </div>
          ) : (
            activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4"
              >
                <div className="mt-1">
                  {activity.status === 'pending' && <Loader2 className="animate-spin text-purple-400" size={18} />}
                  {activity.status === 'success' && <CheckCircle2 className="text-green-400" size={18} />}
                  {activity.status === 'failed' && <XCircle className="text-red-400" size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm text-white capitalize">
                      {activity.status === 'pending' && '⏳ '}
                      {activity.status === 'success' && '✅ '}
                      {activity.status === 'failed' && '❌ '}
                      {activity.type} {activity.status}
                    </p>
                    <span className="text-[10px] text-gray-500">
                      {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono italic">
                    By: {shortenAddress(activity.address)}
                  </p>
                  {activity.hash && (
                    <a 
                      href={`https://stellar.expert/explorer/testnet/tx/${activity.hash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-purple-400/80 hover:text-purple-400 underline mt-1 block transition-colors"
                    >
                      View on Stellar Expert ↗
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
