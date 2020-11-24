import axios from 'axios';

export default async function rewards({
  proxyUrl,
  address,
  timeout,
}: {
  proxyUrl: string;
  address: string;
  timeout: number;
}) {
  try {
    const {
      data: {
        claimableRewards,
        userActiveStake,
        userDeferredPaymentStake,
        userUnstakedStake,
        userWaitingStake,
        userWithdrawOnlyStake,
      },
    } = await axios.get(`${proxyUrl}/accounts/${address}/delegation`, { timeout });

    return {
      claimableRewards,
      userActiveStake,
      userDeferredPaymentStake,
      userUnstakedStake,
      userWaitingStake,
      userWithdrawOnlyStake,
    };
  } catch (error) {
    console.log('\x1b[42m%s\x1b[0m', 'here');
    console.error('rewards error', error);
    throw new Error(error);
  }
}
