import React, { useState, useEffect } from 'react';
import { Layers, Server, Repeat, Coins, ChevronDown, Rocket, Users, Wallet, Lock, Landmark } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

// --- Reusable Visual Components ---

const ShardingSimulation = () => {
    const [traffic, setTraffic] = useState(20);
    const numShards = Math.max(1, Math.ceil(traffic / 25));

    return (
        <div className="my-10 p-6 bg-slate-950/50 border border-slate-800 rounded-xl">
            <h4 className="text-lg font-bold text-white mb-4 text-center">Dynamic Sharding Simulation</h4>
            <div className="mb-6">
                <label htmlFor="traffic" className="block text-sm font-medium text-slate-400 mb-2">
                    Simulated Network Traffic: <span className="font-bold text-cyan-400">{traffic}%</span>
                </label>
                <input
                    id="traffic"
                    type="range"
                    min="1"
                    max="100"
                    value={traffic}
                    onChange={(e) => setTraffic(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
            </div>
            <div className="grid grid-cols-4 gap-2 h-32 transition-all duration-300">
                {Array.from({ length: 4 }).map((_, shardIndex) => (
                    <div
                        key={shardIndex}
                        className={`p-2 rounded-lg border-2 transition-all duration-500 ${
                            shardIndex < numShards
                                ? 'bg-cyan-500/10 border-cyan-500 animate-pulse'
                                : 'bg-slate-800/50 border-slate-700'
                        }`}
                    >
                        <div className="text-center font-bold text-xs mb-2 text-white">
                            Shard {shardIndex + 1}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                            {Array.from({ length: 4 }).map((_, nodeIndex) => (
                                <div
                                    key={nodeIndex}
                                    className={`h-4 rounded-sm transition-colors duration-300 ${
                                        shardIndex < numShards ? 'bg-cyan-500/50' : 'bg-slate-700'
                                    }`}
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">As traffic increases, the network dynamically activates more shards to handle the load in parallel.</p>
        </div>
    );
};

const PermawebFlowDiagram = () => (
    <div className="my-10 p-6 bg-slate-950/50 border border-slate-800 rounded-xl">
        <h4 className="text-lg font-bold text-white mb-8 text-center">Permaweb Data Lifecycle</h4>
        <div className="flex flex-col items-center gap-4 text-center text-sm font-bold">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700">
                <Layers size={16} className="text-blue-400" /> <span className="text-white">1. User Uploads Data</span>
            </div>
            <div className="h-8 w-px bg-slate-700 relative"><div className="flow-particle-y cyan" style={{ animationDuration: '1.5s' }}></div></div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700">
                <Lock size={16} className="text-emerald-400" /> <span className="text-white">2. Encrypt & Shard</span>
            </div>
            <div className="h-8 w-px bg-slate-700 relative"><div className="flow-particle-y" style={{ animationDuration: '1.5s' }}></div></div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700">
                <Server size={16} className="text-purple-400" /> <span className="text-white">3. Distribute to Nodes</span>
            </div>
        </div>
    </div>
);

const endowmentData = Array.from({ length: 20 }, (_, i) => ({
    year: 2024 + i * 5,
    yield: 5 + i * 2.5 + Math.random() * 2,
    cost: 15 - i * 0.7 - Math.random(),
}));

const EndowmentChart = () => (
    <div className="my-10 p-6 bg-slate-950/50 border border-slate-800 rounded-xl h-80">
        <h4 className="text-lg font-bold text-white mb-4 text-center">Endowment Sustainability Projection</h4>
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={endowmentData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <defs>
                    <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} unit="M" />
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem' }} formatter={(value: number) => `$${value.toFixed(2)}M`} />
                <Legend verticalAlign="top" height={36} iconSize={10} />
                <Area type="monotone" dataKey="yield" name="Projected Yield" stroke="#10b981" fillOpacity={1} fill="url(#colorYield)" />
                <Area type="monotone" dataKey="cost" name="Storage Cost" stroke="#f97316" fillOpacity={1} fill="url(#colorCost)" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

const tokenomicsData = [
  { name: 'Presale', value: 40, color: '#10b981' },
  { name: 'Incentives', value: 30, color: '#06b6d4' },
  { name: 'Liquidity', value: 10, color: '#3b82f6' },
  { name: 'Team', value: 10, color: '#a855f7' },
  { name: 'Treasury', value: 10, color: '#f97316' },
];

const emissionData = [
  { year: '0-20', emission: 45_000_000 },
  { year: '20-40', emission: 22_500_000 },
  { year: '40-60', emission: 11_250_000 },
  { year: '60-80', emission: 5_625_000 },
  { year: '80-100', emission: 2_812_500 },
];

const TokenomicsCharts = () => (
    <div className="my-10 grid md:grid-cols-2 gap-8">
        <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-xl h-80">
            <h4 className="text-lg font-bold text-white mb-4 text-center">Genesis Token Allocation</h4>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie data={tokenomicsData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                        {tokenomicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem' }} />
                    <Legend iconSize={10} />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-xl h-80">
            <h4 className="text-lg font-bold text-white mb-4 text-center">Emission Halving Schedule</h4>
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emissionData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                    <XAxis dataKey="year" stroke="#64748b" fontSize={12} label={{ value: 'Years', position: 'insideBottom', offset: -15, fill: '#64748b' }} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `${value / 1_000_000}M`} />
                    <Tooltip
                        contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem' }}
                        formatter={(value: number) => `${(value / 1_000_000).toFixed(2)}M FLUID`}
                    />
                    <Bar dataKey="emission" name="FLUID Emitted" fill="#06b6d4" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);


// --- Main Section Components ---

const BlockchainSection = () => (
    <>
        <p>
            Fluid Chain utilizes a novel hybrid consensus mechanism called <strong>Proof of Fluidity (PoF)</strong>. It integrates Byzantine Fault Tolerant Proof-of-Stake (BFT PoS) for transaction finality with a unique Proof-of-Useful-Storage (PoUS) layer. This synergy is engineered to achieve two primary goals: extreme scalability (2M+ TPS) and providing a self-sustaining utility (permanent hosting). This dual-focus ensures network security is intrinsically linked to its usefulness, creating a transparent and robust ecosystem.
        </p>
        <ShardingSimulation />
        <h4>Key Properties</h4>
        <ul>
            <li><strong>Scalability:</strong> Dynamic sharding allows the network to partition based on load, processing transactions in parallel. This means network capacity grows linearly with the number of participating nodes.</li>
            <li><strong>Speed:</strong> Sub-second finality (~600ms) ensures transactions are confirmed almost instantly, making the chain suitable for high-frequency applications like DEXs and global payments.</li>
            <li><strong>Efficiency:</strong> The PoS foundation is significantly more energy-efficient than Proof-of-Work systems, while the PoUS component rewards nodes for useful work (data storage) rather than computational puzzles.</li>
        </ul>
        <h4>Proof-of-Useful-Storage (PoUS) Deep Dive</h4>
        <p>Unlike traditional consensus where work is discarded, PoUS requires storage nodes to continuously prove they are hosting data shards from the Parmaweb. These cryptographic proofs (PoRep & PoSt) are lightweight and verified by the PoS validators. This creates a transparent and unbreakable link: to earn maximum rewards, nodes must contribute to both network security (staking FLUID) and utility (providing storage).</p>
    </>
);

const HostingSection = () => (
    <>
        <p>
            Permanent hosting on Fluid Chain, known as the <strong>PermaWeb</strong>, is a paradigm shift from traditional subscription-based models. It achieves digital permanence through a sophisticated blend of cryptography and a self-sustaining economic model, ensuring data remains accessible and immutable for centuries.
        </p>
        <PermawebFlowDiagram />
        <h4>The Mechanics of Permanence</h4>
        <ol>
            <li><strong>Client-Side Encryption & Sharding:</strong> Data is encrypted on the user's device before upload. It's then erasure-coded into redundant shards, meaning the original file can be reconstructed even if a significant portion of nodes storing its shards go offline. This guarantees extreme data durability.</li>
            <li><strong>Content-Addressing:</strong> All data is addressed by its cryptographic hash (Content ID), not its location. This makes content immutable; any change to the data results in a new Content ID, while the old version remains accessible. This provides unparalleled transparency and verifiability.</li>
            <li><strong>One-Time Fee:</strong> A single payment, priced based on a conservative forecast of future storage costs, is made in $FLUID. This fee is not paid to nodes directly but is instead deposited into the Endowment Pool, the economic heart of the PermaWeb.</li>
        </ol>
        <p>This architecture provides true censorship-resistance and eternal availability, making it the ideal foundation for dApp frontends, NFT metadata, and critical archival data that must withstand the test of time.</p>
    </>
);

const EndowmentSection = () => (
    <>
        <p>
            The endowment pool is the perpetual economic engine that makes the "pay once, host forever" model a sustainable reality. It transforms a one-time user payment into a permanent yield-generating fund that pays for storage indefinitely, ensuring the network is eternally self-sufficient.
        </p>
        <EndowmentChart />
        <h4>How the Perpetual Yield Machine Works</h4>
        <ul>
            <li><strong>Capital Preservation:</strong> When a user pays for storage, 80-95% of that fee is locked into the endowment pool as principal. This capital is never spent directly.</li>
            <li><strong>Yield Generation:</strong> The endowment's capital is programmatically deployed into a diversified portfolio of low-risk, on-chain DeFi strategies (e.g., stablecoin lending, liquidity providing). The yield generated from this capital is the source of ongoing payments to storage nodes.</li>
            <li><strong>Dynamic Payouts:</strong> The protocol transparently calculates the required payments to nodes based on the current cost of storage. As long as the yield covers these costs, the data is stored forever. Historically, storage costs decline over time (Kryder's Law), meaning the endowment's purchasing power grows exponentially, creating a massive sustainability buffer.</li>
        </ul>
        <p>This model aligns the incentives of users, node operators, and token holders. Users get permanent storage, nodes receive perpetual rewards, and the constant locking of $FLUID tokens in the endowment creates a powerful deflationary force, benefiting the entire ecosystem.</p>
    </>
);

const TokenomicsSection = () => {
    return (
        <>
            <h4>Genesis Block & Mainnet Swap</h4>
            <p>
                To bootstrap the ecosystem and facilitate the initial presale, 10% of the total supply (10,000,000 tokens) is created at genesis. These tokens are minted on a host EVM-compatible chain (e.g., as an ERC-20 token) for broad accessibility. This is the **only pre-mined supply**; the remaining 90,000,000 $FLUID will be emitted programmatically on the native Fluid Chain mainnet as block rewards over ~200 years.
            </p>
            <p>
                Upon the launch of the Fluid Chain mainnet, holders of the genesis (ERC-20) token will be able to perform a **1:1 swap** for native $FLUID coins through a secure and audited bridge portal. This ensures a transparent and seamless migration for all early supporters and presale participants.
            </p>
            <TokenomicsCharts />
            <h4>Genesis Token Allocation (10,000,000 Tokens)</h4>
            <ul>
                <li><strong>Presale (40%):</strong> 4,000,000 tokens allocated for public sale to distribute ownership and raise funds for development.</li>
                <li><strong>Incentives (30%):</strong> 3,000,000 tokens for community growth, including airdrops, marketing, and early user rewards.</li>
                <li><strong>Liquidity (10%):</strong> 1,000,000 tokens to provide initial liquidity on decentralized and centralized exchanges.</li>
                <li><strong>Team (10%):</strong> 1,000,000 tokens for core contributors, subject to a 10-year vesting schedule to ensure long-term alignment.</li>
                <li><strong>Treasury (10%):</strong> 1,000,000 tokens for the ecosystem fund, used for partnerships, grants, and future development, also subject to a 10-year vesting period.</li>
            </ul>

            <h4>Emission Model (Native Chain)</h4>
            <p>The native emission of 90,000,000 $FLUID follows a stretched Bitcoin model, with 10 halvings occurring every 20 years. As visualized in the chart above, this model provides strong early incentives for nodes to secure the network, while transitioning to a long-term, ultra-scarce asset class sustained by the Endowment and transaction fees.</p>
        </>
    );
};


// --- Main Page Component ---
const DocsPage: React.FC = () => {
    const [openSection, setOpenSection] = useState<string | null>('blockchain');

    const handleToggle = (id: string) => {
        if (openSection === id) {
            setOpenSection(null);
        } else {
            setOpenSection(id);
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    };

    const navItems = [
        { id: 'blockchain', label: 'Blockchain', icon: Layers, component: <BlockchainSection /> },
        { id: 'hosting', label: 'Hosting', icon: Server, component: <HostingSection /> },
        { id: 'endowment', label: 'Endowment Economy', icon: Repeat, component: <EndowmentSection /> },
        { id: 'tokenomics', label: 'Tokenomics', icon: Coins, component: <TokenomicsSection /> },
    ];

    return (
        <div className="min-h-screen pt-28 pb-16 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-white mb-4">Fluid Technical Docs</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        A deep dive into the architecture, consensus, and economic models that power the Fluid ecosystem.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    <aside className="lg:w-1/4 self-start lg:sticky top-28">
                        <nav className="space-y-2">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleToggle(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm text-left ${
                                        openSection === item.id 
                                        ? 'bg-slate-800 text-white' 
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                    }`}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <main className="flex-1 space-y-6">
                         {navItems.map(item => (
                            <SectionWrapper 
                                key={item.id}
                                id={item.id} 
                                title={item.label} 
                                icon={item.icon}
                                isOpen={openSection === item.id}
                                onToggle={() => handleToggle(item.id)}
                            >
                                {item.component}
                            </SectionWrapper>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
};

interface SectionWrapperProps {
    id: string;
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, icon: Icon, children, isOpen, onToggle }) => (
    <section id={id} className="docs-section scroll-mt-24 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <button onClick={onToggle} className="w-full flex items-center justify-between p-6 text-left">
            <div className="flex items-center gap-4">
                <Icon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl font-extrabold text-white">{title}</h2>
            </div>
            <ChevronDown size={24} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-300 leading-loose p-6 pt-0">
                    {children}
                </div>
            </div>
        </div>
    </section>
);

export default DocsPage;
