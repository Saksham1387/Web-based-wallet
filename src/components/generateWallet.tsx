"use client";

import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import SecretPhraseDropdown from "./phrase-words";
import { SolanaWallet } from "./sol-wallet";

export const GenerateWallet = () => {
  const [mnemonic, setMnemonic] = useState<string>("");

  useEffect(() => {
    const initializeMnemonic = async () => {
      const storedMnemonic = localStorage.getItem("men") || "";
      
      if (storedMnemonic === "") {
        const newMnemonic = await generateMnemonic();
        setMnemonic(newMnemonic);
        localStorage.setItem("men", newMnemonic);
      } else {
        setMnemonic(storedMnemonic);
      }
    };

    initializeMnemonic();
  }, []); 

  return (
    <div className="bg-black h-full">
      <SecretPhraseDropdown words={mnemonic ? mnemonic.split(" ") : []} />
      <SolanaWallet mnemonic={mnemonic} />
    </div>
  );
};

export default GenerateWallet;