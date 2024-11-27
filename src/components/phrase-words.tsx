"use client";

import { useState } from "react";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface SecretPhraseDropdownProps {
  words: string[]; 
}

export default function SecretPhraseDropdown({
  words,
}: SecretPhraseDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  //   const words = [
  //     'sunset', 'hockey', 'nominee', 'bring',
  //     'awful', 'trouble', 'warrior', 'nice',
  //     'immense', 'rude', 'subway', 'exotic'
  //   ]

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div
          className="flex justify-between items-center p-4 bg-zinc-900 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors"
          onClick={toggleDropdown}
        >
          <h1 className="text-2xl font-medium">Your Secret Phrase</h1>
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </div>

        {isOpen && (
          <div
            className="bg-zinc-900 rounded-lg p-4 space-y-4"
            onClick={handleCopy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {words.map((word, index) => (
                <div
                  key={index}
                  className="bg-zinc-800 rounded-lg p-4 text-lg cursor-pointer hover:bg-zinc-700 transition-colors"
                >
                  {word}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Copy className="h-4 w-4" />
              Click Anywhere To Copy
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
