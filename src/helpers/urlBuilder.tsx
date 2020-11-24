const urlBuilder = {
  shard: (shard: number | string) => `/blocks?shard=${shard}`,
  receiverShard: (shard: number | string) => `/transactions?receivershard=${shard}`,
  senderShard: (shard: number | string) => `/transactions?sendershard=${shard}`,
  nodeDetails: (publicKey: string) => `/nodes/${publicKey}`,
  accountDetails: (address: string) => `/accounts/${address}`,
};

export default urlBuilder;