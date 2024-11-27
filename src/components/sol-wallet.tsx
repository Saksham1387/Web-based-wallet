import { useCallback, useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import WalletCard from "./wallet-card";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

interface Wallet {
  publicKey: string;
  privateKey: string;
  balance: number;
}
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SolanaWallet({ mnemonic }: { mnemonic: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function getBalance(publicKey: string | any) {
    const wallet = new PublicKey(publicKey );
    const balance = await connection.getBalance(wallet);
    const finalBalance = balance / LAMPORTS_PER_SOL;
    return finalBalance;
  }

  useEffect(() => {
    const storedWallets = localStorage.getItem("wallets");
    if (storedWallets) {
      const parsedWallets = JSON.parse(storedWallets) as Wallet[];
      setWallets(parsedWallets);
      setCurrentIndex(parsedWallets.length);
    }
  }, []);
  useEffect(() => {
    updateAllBalances();
  }, [wallets.length]);

  const updateAllBalances = useCallback(async () => {
    if (wallets.length === 0) return;

    
    try {
      const updatedWallets = await Promise.all(
        wallets.map(async (wallet) => ({
          ...wallet,
          balance: await getBalance(wallet.publicKey),
        }))
      );
      setWallets(updatedWallets);
    } catch (error) {
      console.error("Failed to update balances:", error);
    } finally {
     
    }
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }, [wallets]);

  const createWallet = useCallback(async () => {
    setIsLoading(true);
    try {
      const mon:string = mnemonic || ""
      const seed = await mnemonicToSeed(mon);
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      const newWallet: Wallet = {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: Buffer.from(keypair.secretKey).toString("hex"),
        balance: 0, 
      };

      setWallets((prevWallets) => [...prevWallets, newWallet]);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error("Failed to create wallet:", error);
    } finally {
      setIsLoading(false);
    }
  }, [mnemonic, currentIndex]);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6 p-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Solana Wallet Manager
        </h1>

        <div className="flex justify-center mb-6 gap-5">
          <Button onClick={createWallet} disabled={isLoading} className="w-1/4">
            {isLoading ? "Creating Wallet..." : "Create New Wallet"}
          </Button>
          <Button
            onClick={() => {
              localStorage.removeItem("wallets");
              setWallets([]);
            }}
            disabled={isLoading}
            className="w-1/4 bg-red-500 hover:bg-red-800    "
          >
            Delete All Wallets
          </Button>
        </div>
        <div>
          <p className="text-gray-500 text-center">
            The balances fetched are from Devnet you can aidrop some SOL to the
            address and see the changes here
          </p>
        </div>

        {wallets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
            {wallets.map((wallet, index) => (
              <WalletCard
                key={wallet.publicKey}
                walletNumber={`Wallet ${index + 1}`}
                publicKey={wallet.publicKey}
                privateKey={wallet.privateKey}
                balance={wallet.balance}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400">
            No wallets created yet. Click the button above to create your first
            wallet.
          </p>
        )}
      </div>
    </div>
  );
}

export default SolanaWallet;
