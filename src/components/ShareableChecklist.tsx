import { useMemo, useState } from 'react';
import { Share2, ClipboardCheck } from 'lucide-react';

const checklistCategories = [
  {
    title: 'Kitchen Refresh',
    description: 'Keep your cooking space ready for the next meal.',
    items: [
      'Wipe countertops and cabinet fronts',
      'Sanitize sink and faucet fixtures',
      'Clean appliance exteriors (fridge, microwave, oven)',
      'Sweep and mop floors',
    ],
  },
  {
    title: 'Bathroom Reset',
    description: 'Ensure a sparkling, hygienic bathroom for every guest.',
    items: [
      'Disinfect sinks, toilets, and showers',
      'Polish mirrors and chrome fixtures',
      'Restock towels and toiletries',
      'Empty trash and replace liners',
    ],
  },
  {
    title: 'Living Spaces',
    description: 'Create welcoming spaces for relaxing or entertaining.',
    items: [
      'Dust surfaces, décor, and electronics',
      'Vacuum rugs and upholstered furniture',
      'Fluff pillows and fold throws',
      'Spot clean high-touch areas',
    ],
  },
  {
    title: 'Bedrooms',
    description: 'Deliver hotel-level comfort with these touch points.',
    items: [
      'Change linens and make beds crisply',
      'Dust nightstands, lamps, and shelving',
      'Organize personal items and surfaces',
      'Vacuum floors and under beds',
    ],
  },
];

const buildShareMessage = () => {
  const lines = checklistCategories.flatMap((category) => [
    category.title,
    ...category.items.map((item) => `• ${item}`),
    '',
  ]);

  return ['Self Maid Cleaning Checklist', '', ...lines].join('\n').trim();
};

export default function ShareableChecklist() {
  const [copied, setCopied] = useState(false);

  const shareMessage = useMemo(() => buildShareMessage(), []);

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error('Failed to copy checklist', error);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: 'Self Maid Cleaning Checklist',
          text: shareMessage,
        });
        return;
      } catch (error) {
        if ((error as DOMException).name === 'AbortError') {
          return;
        }
        console.error('Failed to share checklist', error);
      }
    }

    await handleCopy();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border-2 border-emerald-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <ClipboardCheck className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Shareable Cleaning Checklist</h2>
            </div>
            <p className="text-emerald-50 mt-2 max-w-2xl">
              Send your team or clients a ready-to-go list of cleaning tasks. Copy or share instantly to keep everyone aligned on the plan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleShare}
              className="bg-white/10 border border-white/30 text-white px-5 py-3 rounded-xl hover:bg-white/20 transition-all font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share checklist
              </span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-white text-emerald-700 px-5 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </button>
          </div>
        </div>

        <div className="p-8 grid gap-6 md:grid-cols-2">
          {checklistCategories.map((category) => (
            <div
              key={category.title}
              className="h-full rounded-2xl border-2 border-gray-100 p-6 hover:border-emerald-200 transition-colors bg-gradient-to-br from-white to-emerald-50/30"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <ul className="space-y-3 text-gray-700">
                {category.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-semibold text-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
