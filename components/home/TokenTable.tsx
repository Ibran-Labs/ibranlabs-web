import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useReadAddressPosition } from "@/hooks/read/useReadPositionAddress";
import { useReadPositionBalance } from "@/hooks/read/useReadPositionBalance";
import { defaultChain } from "@/lib/get-default-chain";
import { tokens } from "@/constants/tokenAddress";
import { EnrichedPool } from "@/lib/pair-token-address";
import Link from "next/link";
import { RepayDialog } from "@/components/dialog/repay-dialog";
import { useAccount } from "wagmi";

interface TokenTableProps {
  pool: EnrichedPool | null;
}

export const TokenTable: React.FC<TokenTableProps> = ({ pool }) => {
  const [isRepayDialogOpen, setIsRepayDialogOpen] = React.useState(false);
  const [selectedToken, setSelectedToken] = React.useState<
    (typeof tokens)[0] | null
  >(null);
  const { address, isConnected } = useAccount();

  const { addressPosition, isLoadingAddressPosition } = useReadAddressPosition(
    pool?.id || "0x0000000000000000000000000000000000000000"
  );

  // Get all tokens for current chain
  const chainTokens = tokens.filter(
    (token) =>
      token.addresses[defaultChain] &&
      token.addresses[defaultChain] !==
        "0x0000000000000000000000000000000000000000"
  );

  // Call hooks for each token at the top level
  const wethToken = chainTokens.find((t) => t.symbol === "WETH");
  const {
    positionBalance: wethBalance,
    isLoadingPositionBalance: wethLoading,
  } = useReadPositionBalance(
    wethToken?.addresses[defaultChain] ||
      "0x0000000000000000000000000000000000000000",
    addressPosition || "0x0000000000000000000000000000000000000000"
  );

  const wbtcToken = chainTokens.find((t) => t.symbol === "WBTC");
  const {
    positionBalance: wbtcBalance,
    isLoadingPositionBalance: wbtcLoading,
  } = useReadPositionBalance(
    wbtcToken?.addresses[defaultChain] ||
      "0x0000000000000000000000000000000000000000",
    addressPosition || "0x0000000000000000000000000000000000000000"
  );

  const usdcToken = chainTokens.find((t) => t.symbol === "USDC");
  const {
    positionBalance: usdcBalance,
    isLoadingPositionBalance: usdcLoading,
  } = useReadPositionBalance(
    usdcToken?.addresses[defaultChain] ||
      "0x0000000000000000000000000000000000000000",
    addressPosition || "0x0000000000000000000000000000000000000000"
  );

  const usdtToken = chainTokens.find((t) => t.symbol === "USDT");
  const {
    positionBalance: usdtBalance,
    isLoadingPositionBalance: usdtLoading,
  } = useReadPositionBalance(
    usdtToken?.addresses[defaultChain] ||
      "0x0000000000000000000000000000000000000000",
    addressPosition || "0x0000000000000000000000000000000000000000"
  );

  // Create token balances array with the hook results
  const tokenBalances = [
    {
      token: wethToken,
      positionBalance: wethBalance,
      isLoadingPositionBalance: wethLoading,
    },
    {
      token: wbtcToken,
      positionBalance: wbtcBalance,
      isLoadingPositionBalance: wbtcLoading,
    },
    {
      token: usdcToken,
      positionBalance: usdcBalance,
      isLoadingPositionBalance: usdcLoading,
    },
    {
      token: usdtToken,
      positionBalance: usdtBalance,
      isLoadingPositionBalance: usdtLoading,
    },
  ].filter((item) => item.token); // Filter out undefined tokens

  if (!pool) {
    return (
      <div className="text-center py-8 text-gray-400">
        Please select a pool to view tokens
      </div>
    );
  }

  // Check if wallet is connected first
  if (!isConnected) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-lg">🔒</div>
          <div>Please connect your wallet to view position details</div>
          <div className="text-sm text-gray-500">
            Wallet connection required to access position data
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingAddressPosition) {
    return (
      <div className="text-center py-8 text-gray-400">
        <div className="flex items-center justify-center gap-2">
          <Spinner size="sm" className="text-gray-400" />
          <span>Loading position address...</span>
        </div>
      </div>
    );
  }

  if (
    !addressPosition ||
    addressPosition === "0x0000000000000000000000000000000000000000"
  ) {
    return (
      <div className="text-center py-4 text-gray-400">
        <div className="flex flex-col items-center justify-center gap-2">
          <div>No position found for this pool</div>
        </div>
      </div>
    );
  }

  const formatBalance = (
    positionBalance: any,
    isLoadingPositionBalance: boolean,
    token: any
  ) => {
    if (isLoadingPositionBalance)
      return <Spinner size="sm" className="text-green-400" />;
    if (!positionBalance) return "0.00";

    const balance = Number(positionBalance) / Math.pow(10, token.decimals);
    return balance.toFixed(5);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-blue-400/30 shadow-sm bg-slate-800/30">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-3 gap-4 p-4 text-sm font-medium text-blue-300 border-b border-blue-400/20">
        <div>Assets</div>
        <div className="text-center">Current Balance</div>
        <div className="text-center">Quick Actions</div>
      </div>

      {/* Token List */}
      <div className="divide-y divide-blue-400/20">
        {tokenBalances.length === 0 ? (
          <div className="hidden md:block text-center py-8 text-gray-400">
            No tokens found for this pool
          </div>
        ) : (
          tokenBalances.map(
            ({ token, positionBalance, isLoadingPositionBalance }) => {
              if (!token) return null;
              return (
                <div key={token.addresses[defaultChain]} className="p-4">
                  {/* Mobile Layout */}
                  <div className="space-y-3">
                    {/* Token Info Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {token.logo && (
                          <Image
                            src={token.logo}
                            alt={token.symbol}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-white font-medium">
                          ${token.symbol}
                        </span>
                      </div>
                      <div className="text-green-400 font-medium">
                        {formatBalance(
                          positionBalance,
                          isLoadingPositionBalance,
                          token
                        )}
                      </div>
                    </div>
                    {/* Actions Row */}
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/swap" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white hover:text-white border-blue-500"
                        >
                          Swap
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-full h-9 bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-500"
                        onClick={() => {
                          setSelectedToken(token);
                          setIsRepayDialogOpen(true);
                        }}
                      >
                        Repay
                      </Button>
                    </div>
                  </div>
                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-3 gap-4 items-center">
                    {/* Assets Column */}
                    <div className="flex items-center gap-3">
                      {token.logo && (
                        <Image
                          src={token.logo}
                          alt={token.symbol}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-white font-medium">
                        ${token.symbol}
                      </span>
                    </div>
                    {/* Balance Column */}
                    <div className="text-center">
                      <span className="text-green-400 font-medium">
                        {formatBalance(
                          positionBalance,
                          isLoadingPositionBalance,
                          token
                        )}
                      </span>
                    </div>
                    {/* Actions Column */}
                    <div className="flex items-center justify-center gap-2">
                      <Link href="/swap">
                        <Button
                          variant="outline"
                          className="w-24 h-9 bg-blue-600 hover:bg-blue-700 text-white hover:text-white border-blue-500"
                        >
                          Swap
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="w-24 h-9 bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-500"
                        onClick={() => {
                          setSelectedToken(token);
                          setIsRepayDialogOpen(true);
                        }}
                      >
                        Repay
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
      <RepayDialog
        market={pool}
        selectedToken={selectedToken}
        isOpen={isRepayDialogOpen}
        onClose={() => setIsRepayDialogOpen(false)}
      />
    </div>
  );
};
