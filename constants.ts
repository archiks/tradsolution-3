
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Price Action Playbook',
    price: 200,
    level: 1,
    tagline: 'Master naked chart precision & clarity.',
    description: 'The foundational text for understanding market structure without indicators.',
    features: ['Market Structure Mapping', 'Liquidity Identification', 'Entry Triggers'],
    chapters: [
      { title: 'The Anatomy of a Candlestick', points: ['Reading order flow in a single bar', 'Wick rejection theory', 'Body-to-wick ratios'] },
      { title: 'Market Structure Shift', points: ['Identifying true breaks of structure', 'Avoiding fake-outs', 'Multi-timeframe alignment'] },
      { title: 'Liquidity Pools', points: ['Where stops are located', 'Stop hunts vs. reversals', 'Institutional interest levels'] }
    ]
  },
  {
    id: 'prod_2',
    name: 'The Prop Challenge Manual',
    price: 250,
    level: 2,
    tagline: 'Pass & keep funded accounts under strict rules.',
    description: 'Specific risk management protocols designed for prop firm criteria.',
    features: ['Risk of Ruin Calculations', 'Drawdown Management', 'Psychology of Funding'],
    chapters: [
      { title: 'The Evaluation Phase', points: ['Aggressive vs. Conservative sizing', 'The 5% rule', 'News event navigation'] },
      { title: 'Drawdown Defense', points: ['Recovering from -4%', 'Halving risk protocols', 'Emotional reset techniques'] },
      { title: 'The Verification Phase', points: ['Transitioning to preservation mode', 'Time management', 'Scaling into winners'] }
    ]
  },
  {
    id: 'prod_3',
    name: 'Retail Quant',
    price: 500,
    level: 3,
    tagline: 'Transform trading intuition into probability.',
    description: 'Learn to backtest, collect data, and validate your edge mathematically.',
    features: ['Excel/Python for Traders', 'Statistical Validation', 'System Optimization'],
    chapters: [
      { title: 'Data Collection Framework', points: ['Building a trade log database', 'Defining variables', 'Clean data vs. noise'] },
      { title: 'Backtesting Mechanics', points: ['Manual vs. Automated testing', 'Sample size significance', 'Curve fitting dangers'] },
      { title: 'Probability Modeling', points: ['Monte Carlo simulations', 'Expectancy calculation', 'Win rate vs. R:R balance'] }
    ]
  },
  {
    id: 'prod_4',
    name: 'Institutional Playbook',
    price: 1000,
    level: 4,
    tagline: 'Install the professional trader’s operating system.',
    description: 'The complete desk manual used by institutional order flow traders.',
    features: ['Order Flow Dynamics', 'Dark Pool Analysis', 'Macro-Economic Framework'],
    chapters: [
      { title: 'The Interbank Market', points: ['How orders are routed', 'Liquidity providers vs. takers', 'Spread mechanics'] },
      { title: 'Order Flow Sequencing', points: ['Footprint charts', 'Delta divergence', 'Absorption at key levels'] },
      { title: 'Macro-Fundamental Overlay', points: ['Central bank policy impact', 'Yield curve analysis', 'Currency correlation matrices'] }
    ]
  }
];

export const TESTIMONIALS = [
  {
    initials: "JD",
    name: "James D.",
    role: "Funded Trader (200k)",
    text: "The Prop Challenge Manual changed everything. I stopped gambling and started operating like a business."
  },
  {
    initials: "MK",
    name: "Maria K.",
    role: "Quant Analyst",
    text: "Retail Quant gave me the math to trust my entries. No more hesitation."
  },
  {
    initials: "SL",
    name: "Sarah L.",
    role: "Forex Scalper",
    text: "Finally, a guide that doesn't rely on lagging indicators. Pure price action."
  },
  {
    initials: "AR",
    name: "Alex R.",
    role: "Institutional Trainee",
    text: "This is exactly what they teach on the desk. The Playbook is worth 10x the price."
  }
];

export const PAIN_POINTS = [
  "Inconsistency in monthly returns",
  "Analysis paralysis from too many indicators",
  "Fear of pulling the trigger on valid setups",
  "Over-leveraging to recover small losses",
  "Getting stopped out by 'stop hunts'",
  "Lack of a clear, repeatable process",
  "Emotional trading during high volatility",
  "Jumping from strategy to strategy",
  "Passing challenges but failing verification",
  "No data to back up your intuition"
];

export const COUNTRIES = [
    "United Kingdom", "United States", "Germany", "France", "Italy", 
    "Spain", "Netherlands", "Switzerland", "Canada", "Australia", 
    "Japan", "Singapore", "United Arab Emirates", "South Africa"
];
