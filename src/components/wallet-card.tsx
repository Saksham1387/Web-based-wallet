'use client'

import { useState } from 'react'
import { Eye, EyeOff, Copy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'

interface WalletCardProps {
  walletNumber: string
  publicKey: string
  privateKey: string
  balance: number
}

export default function WalletCard({ walletNumber, publicKey, privateKey, balance }: WalletCardProps) {
  const [isPrivateKeyVisible, setIsPrivateKeyVisible] = useState(false)

  const togglePrivateKeyVisibility = () => {
    setIsPrivateKeyVisible(!isPrivateKeyVisible)
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied to clipboard`)
  }

  return (
    <Card className="w-full max-w-md bg-zinc-900 text-white border-zinc-700">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wallet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="wallet-number" className="text-sm font-medium text-zinc-400">Wallet Number</Label>
          <div className="flex">
            <Input
              id="wallet-number"
              value={walletNumber}
              readOnly
              className="flex-grow bg-zinc-800 border-zinc-700 text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(walletNumber, 'Wallet number')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="public-key" className="text-sm font-medium text-zinc-400">Public Key</Label>
          <div className="flex">
            <Input
              id="public-key"
              value={publicKey}
              readOnly
              className="flex-grow bg-zinc-800 border-zinc-700 text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(publicKey, 'Public key')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="private-key" className="text-sm font-medium text-zinc-400">Private Key</Label>
          <div className="flex">
            <Input
              id="private-key"
              type={isPrivateKeyVisible ? 'text' : 'password'}
              value={privateKey}
              readOnly
              className="flex-grow bg-zinc-800 border-zinc-700 text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={togglePrivateKeyVisibility}
            >
              {isPrivateKeyVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => copyToClipboard(privateKey, 'Private key')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="balance" className="text-sm font-medium text-zinc-400">Balance</Label>
          <Input
            id="balance"
            value={`${balance.toFixed(2)} SOl`}
            readOnly
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
      </CardContent>
    </Card>
  )
}

