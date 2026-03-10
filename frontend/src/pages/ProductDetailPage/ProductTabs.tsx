import { useState } from 'react';
import type { Item } from '../../types/item';

const TABS = ['Details', 'Size Guide', 'Reviews'] as const;
type Tab = (typeof TABS)[number];

interface ProductTabsProps {
  item: Item;
}

export default function ProductTabs({ item }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Details');

  return (
    <div className="mt-16 border-t border-gray-200">
      {/* Tab headers */}
      <div className="flex gap-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              'py-5 text-xs tracking-widest uppercase border-b-2 -mb-px transition-colors',
              activeTab === tab
                ? 'border-black text-black'
                : 'border-transparent text-gray-400 hover:text-black',
            ].join(' ')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-10 text-sm text-gray-600 leading-relaxed max-w-2xl">
        {activeTab === 'Details' && (
          <div className="space-y-4">
            <p>{item.description}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>100% premium materials</li>
              <li>Dry clean recommended</li>
              <li>Imported</li>
              <li>Model is 178cm and wearing size S</li>
            </ul>
          </div>
        )}
        {activeTab === 'Size Guide' && (
          <div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Size', 'Chest (cm)', 'Waist (cm)', 'Hip (cm)'].map((h) => (
                    <th key={h} className="pb-3 tracking-widest uppercase text-gray-400 pr-8">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['XS', '82', '64', '88'],
                  ['S', '86', '68', '92'],
                  ['M', '90', '72', '96'],
                  ['L', '94', '76', '100'],
                  ['XL', '98', '80', '104'],
                ].map(([size, ...vals]) => (
                  <tr key={size}>
                    <td className="py-3 font-medium pr-8">{size}</td>
                    {vals.map((v, i) => <td key={i} className="py-3 pr-8 text-gray-500">{v}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'Reviews' && (
          <p className="text-gray-400 tracking-wide">No reviews yet. Be the first to write one.</p>
        )}
      </div>
    </div>
  );
}
