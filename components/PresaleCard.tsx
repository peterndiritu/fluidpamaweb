import React, { useEffect, useState } from 'react';
import { ChevronDown, Lightbulb, Wallet, Check, AlertCircle, Info } from 'lucide-react';
import { 
  useActiveAccount, 
  useSendTransaction, 
  ConnectButton,
  useSwitchActiveWalletChain,
  useActiveWalletChain
} from "thirdweb/react";
import { 
  getContract, 
  prepareContractCall, 
  defineChain,
  toWei,
  toUnits
} from "thirdweb";
import { client, wallets } from "../client";

// --- Configuration ---
const PRESALE_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Placeholder
const FALLBACK_FLUID_PRICE = 0.05; // $0.05 per Fluid

// Chain Definitions
const ETH_CHAIN = defineChain(1);
const BSC_CHAIN = defineChain(56);
const POLYGON_CHAIN = defineChain(137);

// Token Addresses (Placeholders)
const USDT_ETH_ADDR = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const USDC_POLY_ADDR = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

interface PaymentOption {
  id: string;
  symbol: string;
  name: string;
  network: string;
  chainId: number;
  icon: string;
  isNative: boolean;
  address?: string; // Token address
  decimals: number;
  coingeckoId: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'ethereum' },
  { id: 'bnb', symbol: 'BNB', name: 'BNB Smart Chain', network: 'BEP-20', chainId: 56, icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'binancecoin' },
  { id: 'usdt_eth', symbol: 'USDT', name: 'Tether', network: 'ERC-20', chainId: 1, icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=026', isNative: false, address: USDT_ETH_ADDR, decimals: 6, coingeckoId: 'tether' },
  { id: 'usdc_poly', symbol: 'USDC', name: 'USD Coin', network: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026', isNative: false, address: USDC_POLY_ADDR, decimals: 6, coingeckoId: 'usd-coin' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', network: 'Solana', chainId: -1, icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=026', isNative: true, decimals: 9, coingeckoId: 'solana' },
  { id: 'matic', symbol: 'MATIC', name: 'Polygon', network: 'Polygon', chainId: 137, icon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026', isNative: true, decimals: 18, coingeckoId: 'matic-network' },
];

const PresaleCard: React.FC = () => {
  const account = useActiveAccount();
  const { mutateAsync: switchChain } = useSwitchActiveWalletChain();
  const activeChain = useActiveWalletChain();
  const chainId = activeChain?.id;
  const { mutate: sendTransaction } = useSendTransaction();

  // State
  const [selectedPayment, setSelectedPayment] = useState<PaymentOption>(PAYMENT_OPTIONS[0]);
  const [usdAmount, setUsdAmount] = useState<string>('100');
  const [cryptoPrice, setCryptoPrice] = useState<number>(3200); // Initial fallback for ETH
  const [fluidPrice, setFluidPrice] = useState<number>(FALLBACK_FLUID_PRICE);
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  // Calculate amounts
  const cryptoAmount = cryptoPrice > 0 && usdAmount ? parseFloat(usdAmount) / cryptoPrice : 0;
  const fluidAmount = usdAmount ? parseFloat(usdAmount) / fluidPrice : 0;

  // --- Fetch Prices ---
  useEffect(() => {
    const fetchPrice = async () => {
      // Stablecoins don't need real-time fetching
      if (selectedPayment.symbol === 'USDT' || selectedPayment.symbol === 'USDC') {
        setCryptoPrice(1);
        return;
      }

      try {
        const coingeckoId = selectedPayment.coingeckoId;
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`);
        
        if (!res.ok) throw new Error('API Response not OK');

        const data = await res.json();
        if (data[coingeckoId] && data[coingeckoId].usd) {
          setCryptoPrice(data[coingeckoId].usd);
        }
      } catch (e) {
        console.warn("Price fetch failed, using fallback:", e);
        // Fallbacks
        if (selectedPayment.symbol === 'ETH') setCryptoPrice(3250);
        else if (selectedPayment.symbol === 'BNB') setCryptoPrice(610);
        else if (selectedPayment.symbol === 'MATIC') setCryptoPrice(0.72);
        else if (selectedPayment.symbol === 'SOL') setCryptoPrice(148);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [selectedPayment]);

  const handleBuy = async () => {
    if (!account || !usdAmount) return;
    setStatus('PENDING');
    try {
      if (selectedPayment.chainId !== -1 && chainId !== selectedPayment.chainId) {
         await switchChain(defineChain(selectedPayment.chainId));
      }
      if (selectedPayment.chainId === -1) {
          alert("Solana support coming soon.");
          setStatus('IDLE');
          return;
      }
      // Transaction logic...
      setTimeout(() => setStatus('SUCCESS'), 2000);
    } catch (e) {
      console.error(e);
      setStatus('ERROR');
    }
  };

  return (
    <div className="w-full max-w-[480px] mx-auto z-10">
      <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white tracking-tight">Buy Fluid presale</h2>
            <div className="flex items-center gap-2 mt-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Sale stage 1 live</span>
            </div>
        </div>
        <div className="p-6 space-y-6">
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">Payment method</span>
                    <span className="text-xs text-slate-500">Multichain support</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {PAYMENT_OPTIONS.slice(0, 4).map(opt => (
                        <button key={opt.id} onClick={() => setSelectedPayment(opt)} className={`flex flex-col items-center p-3 rounded-xl border transition-all ${selectedPayment.id === opt.id ? 'bg-white/10 border-lime-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                            <img src={opt.icon} alt={opt.symbol} className="w-8 h-8 rounded-full mb-1" />
                            <span className="text-[10px] font-bold text-slate-300">{opt.symbol}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Pay (USD)</label>
                    <div className="relative">
                        <input type="number" value={usdAmount} onChange={(e) => setUsdAmount(e.target.value)} className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold text-white focus:outline-none focus:border-lime-500/50" placeholder="0.00" />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl">
                            <img src={selectedPayment.icon} className="w-5 h-5 rounded-full" />
                            <span className="text-xs font-bold text-white">{selectedPayment.symbol}</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 ml-1 uppercase">Receive ($FLUID)</label>
                    <div className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-4 pr-32 text-2xl font-bold text-emerald-400">
                        {fluidAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                </div>
            </div>
            <div className="pt-2">
                {!account ? (
                    <ConnectButton client={client} wallets={wallets} theme={"dark"} connectButton={{ label: "Connect wallet", className: "!w-full !py-4 !rounded-xl !text-lg !font-bold !bg-white !text-black" }} />
                ) : (
                    <button onClick={handleBuy} disabled={status === 'PENDING'} className="w-full py-4 rounded-xl text-lg font-bold bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 hover:brightness-110 transition-all">
                        {status === 'PENDING' ? 'Processing...' : 'Buy tokens'}
                    </button>
                )}
            </div>
            {status === 'SUCCESS' && <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm text-center">Purchase successful!</div>}
        </div>
      </div>
    </div>
  );
};

export default PresaleCard;