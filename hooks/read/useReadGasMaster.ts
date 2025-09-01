"use client";
import { useReadContract } from "wagmi";
import { helperAbi } from "@/lib/abis/helperAbi";
import { helperAddress } from "@/constants/tokenAddress";

export const useReadGasMaster = (
  destinationDomain: bigint,
  userAmount: bigint,
) => {
  const {
    data: gasMaster,
    isLoading: isLoadingGasMaster,
    refetch: refetchGasMaster,
    error: gasMasterError,
  } = useReadContract({
    address: helperAddress as `0x${string}`,
    abi: helperAbi,
    functionName: "getGasMaster",
    args: [destinationDomain as bigint, userAmount as bigint],
    // Disable the query if destination chain is 8453 (Base)
    query: {
      enabled: destinationDomain !== BigInt(8453),
    },
  });

  // If destination chain is 8453 (Base), return 0 for gas master
  if (destinationDomain === BigInt(8453)) {
    return {
      gasMaster: BigInt(0),
      isLoadingGasMaster: false,
      refetchGasMaster: () => {},
      error: null,
    };
  }

  return {
    gasMaster: gasMaster || BigInt(0),
    isLoadingGasMaster,
    refetchGasMaster,
    error: gasMasterError,
  };
};
