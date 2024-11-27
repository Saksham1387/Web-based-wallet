"use client";

import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import SecretPhraseDropdown from "./phrase-words";
import { SolanaWallet } from "./sol-wallet";

export const GenerateWallet = () => {
  const [mnemonic, setMnemonic] = useState("");
  useEffect(() => {
    const func = async () => {
      const men: string = localStorage.getItem("men") || "";
      if (men == "") {
        const mn = await generateMnemonic();
        setMnemonic(mn);
        localStorage.setItem("men", mn);
      }
      setMnemonic(men);
    };
    func();
  });

  return (
    <div className="bg-black h-full">
      <SecretPhraseDropdown words={mnemonic ? mnemonic.split(" ") : []} />
      <SolanaWallet mnemonic={mnemonic}></SolanaWallet>
    </div>
  );
};
