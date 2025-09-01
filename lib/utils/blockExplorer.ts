export const getBlockExplorerUrl = (chainId: number, txHash: string) => {
  const explorers = {
    8453: "https://basescan.org",
  };

  const baseUrl =
    explorers[chainId as keyof typeof explorers] ||
    "https://basescan.org";
  return `${baseUrl}/tx/${txHash}`;
};
