import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useToast } from '@/hooks/use-toast';

// Define the ethereum property on Window
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Supported networks for the application
const SUPPORTED_NETWORKS = {
  1: 'Ethereum Mainnet',
  // The following are test networks, kept for development/testing
  3: 'Ropsten Testnet',
  4: 'Rinkeby Testnet',
  5: 'Goerli Testnet',
  42: 'Kovan Testnet',
  // Popular L2s and sidechains
  56: 'Binance Smart Chain',
  137: 'Polygon (Matic)',
  80001: 'Polygon Mumbai Testnet'
};

interface Web3ContextType {
  account: string | null;
  chainId: number | undefined;
  active: boolean;
  library: ethers.providers.Web3Provider | undefined;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
  isNetworkSupported: boolean;
  networkName: string;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  chainId: undefined,
  active: false,
  library: undefined,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  isNetworkSupported: false,
  networkName: '',
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3ContextProvider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [active, setActive] = useState(false);
  const [library, setLibrary] = useState<ethers.providers.Web3Provider | undefined>(undefined);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isNetworkSupported, setIsNetworkSupported] = useState(false);
  const [networkName, setNetworkName] = useState('');
  const { toast } = useToast();

  // Check if the current network is supported
  const checkNetworkSupport = (networkId: number) => {
    const isSupported = networkId in SUPPORTED_NETWORKS;
    setIsNetworkSupported(isSupported);
    setNetworkName(isSupported ? SUPPORTED_NETWORKS[networkId as keyof typeof SUPPORTED_NETWORKS] : 'Unsupported Network');
    
    return isSupported;
  };

  // Initialize provider
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setLibrary(provider);
      
      // Check if already connected
      provider.listAccounts().then(accounts => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setActive(true);
          provider.getNetwork().then(network => {
            const currentChainId = network.chainId;
            setChainId(currentChainId);
            
            // Check if the network is supported
            const isSupported = checkNetworkSupport(currentChainId);
            
            if (!isSupported) {
              toast({
                title: 'Network Not Supported',
                description: `You are currently on ${network.name}. Please switch to a supported network.`,
                variant: 'destructive',
              });
            }
          });
        }
      });
    }
  }, [toast]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setActive(true);
        } else {
          setAccount(null);
          setActive(false);
        }
      };

      const handleChainChanged = (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        setChainId(newChainId);
        
        // Check if the new network is supported
        const isSupported = checkNetworkSupport(newChainId);
        
        if (!isSupported) {
          toast({
            title: 'Network Not Supported',
            description: 'You switched to an unsupported network. Some features may not work correctly.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Network Changed',
            description: `Connected to ${SUPPORTED_NETWORKS[newChainId as keyof typeof SUPPORTED_NETWORKS]}`,
          });
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [toast]);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask extension and refresh the page.',
        variant: 'destructive',
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setActive(true);
        
        if (library) {
          const network = await library.getNetwork();
          const currentChainId = network.chainId;
          setChainId(currentChainId);
          
          // Check if the network is supported
          const isSupported = checkNetworkSupport(currentChainId);
          
          if (!isSupported) {
            toast({
              title: 'Network Not Supported',
              description: `You are currently on ${network.name}. Please switch to a supported network.`,
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Wallet Connected',
              description: `Connected to ${SUPPORTED_NETWORKS[currentChainId as keyof typeof SUPPORTED_NETWORKS]}`,
            });
          }
        }
      }
    } catch (error: any) {
      console.error('Error connecting to MetaMask:', error);
      toast({
        title: 'Connection Failed',
        description: error?.message || 'Failed to connect to your wallet',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = () => {
    setAccount(null);
    setActive(false);
    
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    });
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        active,
        library,
        connectWallet,
        disconnectWallet,
        isConnecting,
        isNetworkSupported,
        networkName,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);