import React from 'react'
import { motion } from 'framer-motion';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function FactorInfluence({ factors }) {
  const sortedFactors = [...factors].sort((a, b) => b.impact - a.impact);
  const chartData = sortedFactors.map(factor => ({
    name: factor.name,
    impact: Math.round(factor.impact * 100)
  }));
  return (
    <motion.div
      className='bg-white rounded-xl shadow-lg p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className='text-xl font-semibold mb-4'>Contributing Factors</h3>
      <p className='text-gray-600 mb-6'>These factors have most significant impact on your heart disease risk prediction.</p>
      <div className='h-60'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout='vertical'
            margin={{ top: 55, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type='number' domain={[0, 100]} />
            <YAxis dataKey="name" type='category' width={100} />
            <Tooltip
              formatter={(value) => [`${value}%Impact`, 'Influence']}
              labelStyle={{ color: '#1F2937' }}
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
                boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'
              }} />
            <Bar
              dataKey="impact"
              fill='#3B82F6'
              radius={[0, 4, 4, 0]}
              barSize={24}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className='mt-6'>
        <h4 className='font-medium mb-2'>How to interpret:</h4>
        <ul className='list-disc pl-5 text-gray-600 text-sm space-y-1'>
          <li>Higher percentages indicate factors with stronger influence on your prediction</li>
          <li>Focus on modification factors to potentially reduce your risk</li>
          <li>Consult with a healthcare provider about these results</li>
        </ul>
      </div>
    </motion.div>
  )
}

export default FactorInfluence
