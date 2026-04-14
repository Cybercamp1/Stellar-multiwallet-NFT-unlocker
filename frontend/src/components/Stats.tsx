'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ShieldCheck, Zap } from 'lucide-react';

export default function Stats() {
  const stats = [
    { label: 'Total Value Unlocked', value: '15,240 XLM', icon: <TrendingUp className="text-emerald-400" /> },
    { label: 'Active Collectors', value: '1,284', icon: <Users className="text-blue-400" /> },
    { label: 'Verified Access', value: '99.9%', icon: <ShieldCheck className="text-purple-400" /> },
    { label: 'Avg. Settle Time', value: '2.5s', icon: <Zap className="text-amber-400" /> },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
          <div className="text-2xl font-black text-white">{stat.value}</div>
          <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
