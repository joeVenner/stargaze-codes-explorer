import { GasPrice } from "@cosmjs/stargate";

export type NonEmptyArray<ElementType> = { readonly 0: ElementType } & readonly ElementType[];

export interface BackendSettings {
  readonly nodeUrls: NonEmptyArray<string>;
  readonly denominations: readonly string[];
  readonly addressPrefix: string;
  readonly gasPrice: GasPrice;
  readonly keplrChainInfo?: any;
  readonly cosmostationInfo?: any;
  readonly contractsUrl?: string;
}

const devnetStargateSettings: BackendSettings = {
  nodeUrls: ["https://rpc.stargaze-apis.com"],
  denominations: ["ustars"],
  addressPrefix: "stars",
  gasPrice: GasPrice.fromString("0.25ustars"),
};

const uniSettings: BackendSettings = {
  nodeUrls: ["https://rpc.uni.junonetwork.io"],
  denominations: ["ujunox"],
  addressPrefix: "juno",
  gasPrice: GasPrice.fromString("0.001ujunox"),
  keplrChainInfo: {
    rpc: "https://rpc.uni.junonetwork.io",
    rest: "https://api.uni.junonetwork.io",
    chainId: "uni-5",
    chainName: "Juno Testnet",
    stakeCurrency: {
      coinDenom: "JUNOX",
      coinMinimalDenom: "ujunox",
      coinDecimals: 6,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "juno",
      bech32PrefixAccPub: "junopub",
      bech32PrefixValAddr: "junovaloper",
      bech32PrefixValPub: "junovaloperpub",
      bech32PrefixConsAddr: "junovalcons",
      bech32PrefixConsPub: "junovalconspub",
    },
    currencies: [
      {
        coinDenom: "JUNOX",
        coinMinimalDenom: "ujunox",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "JUNOX",
        coinMinimalDenom: "ujunox",
        coinDecimals: 6,
      },
    ],
    features: ["cosmwasm", "ibc-transfer", "ibc-go", "wasmd_0.24+"],
    explorerUrlToTx: "https://uni.junoscan.com/transactions/{txHash}",
  },
  cosmostationInfo: {
    chainId: "uni-5",
    chainName: "juno-uni",
    addressPrefix: "juno",
    baseDenom: "ujunox",
    displayDenom: "JUNOX",
    restURL: "https://lcd-office.cosmostation.io/uni-2",
    coinType: "118",
    decimals: 6,
    gasRate: {
      average: "0.05",
      low: "0.00",
      tiny: "0.025",
    },
  },
  contractsUrl: "https://graph.juno.giansalex.dev/api/rest/v2.0/"
};

const osmotSetting: BackendSettings = {
  nodeUrls: ["https://testnet-rpc.osmosis.zone/"],
  denominations: ["uosmo"],
  addressPrefix: "osmo",
  gasPrice: GasPrice.fromString("0.0025uosmo"),
  keplrChainInfo: {
    rpc: "https://testnet-rpc.osmosis.zone:443",
    rest: "https://testnet-rest.osmosis.zone:443",
    chainId: "osmo-test-4",
    chainName: "Osmosis Testnet",
    stakeCurrency: {
      coinDenom: "OSMO",
      coinMinimalDenom: "uosmo",
      coinDecimals: 6,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "osmo",
      bech32PrefixAccPub: "osmopub",
      bech32PrefixValAddr: "osmovaloper",
      bech32PrefixValPub: "osmovaloperpub",
      bech32PrefixConsAddr: "osmovalcons",
      bech32PrefixConsPub: "osmovalconspub",
    },
    currencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "OSMO",
        coinMinimalDenom: "uosmo",
        coinDecimals: 6,
      },
    ],
    features: ["ibc-transfer", "cosmwasm", "ibc-go"],
    explorerUrlToTx: "",

  },
  contractsUrl: ""
};

const starsSettings: BackendSettings = {
  nodeUrls: ["https://rpc.stargaze-apis.com"],
  denominations: ["ustars"],
  addressPrefix: "stars",
  gasPrice: GasPrice.fromString("0.25ustars"),
  keplrChainInfo: {
    rpc: "https://rpc.stargaze-apis.com/",
    rest: "https://rest.stargaze-apis.com/",
    chainId: "stargaze-1",
    chainName: "stargaze",
    stakeCurrency: {
      coinDenom: "JUNO",
      coinMinimalDenom: "ujuno",
      coinDecimals: 6,
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "stars",
      bech32PrefixAccPub: "starspub",
      bech32PrefixValAddr: "starsvaloper",
      bech32PrefixValPub: "starsvaloperpub",
      bech32PrefixConsAddr: "starsvalcons",
      bech32PrefixConsPub: "starsvalconspub",
    },
    currencies: [
      {
        coinDenom: "stars",
        coinMinimalDenom: "ustars",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "stars",
        coinMinimalDenom: "ustars",
        coinDecimals: 6,
      },
    ],
    features: ["stargate", "ibc-transfer", "cosmwasm", "no-legacy-stdTx", "ibc-go"],
    explorerUrlToTx: "https://mintscan.io/stargaze/txs/{txHash}",

  },
  contractsUrl: ""
};

const knownBackends: Partial<Record<string, BackendSettings>> = {
  devnetStargate: devnetStargateSettings,
  uninet: uniSettings,
  stars: starsSettings,
  osmot: osmotSetting,
};

export function getCurrentBackend(): BackendSettings {
  const id = "stars";
  const backend = knownBackends[id];
  if (!backend) {
    throw new Error(`No backend found for the given ID "${id}"`);
  }
  return backend;
}
