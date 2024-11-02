export interface Project {
    projectName: string;
    organizationType: string;
    date: string;
    city: string;
    country: string;
    region: string;
    description: string;
    website: string;
    energyCategory: {
        name: string;
        color: string;
    };
    subCategory: string;
    blockchain: string;
    blockchainImages: string[];
    activityStatus: string;
    [key: `sdgGoal${number}`]: string;
    bfgid: string;
    source: string;
    latitude: number;
    longitude: number;
    donations: donationType[];
}


export type donationType = {
    donatorAddress: string;
    amount: number;
    attentionId: string;
    date: string;
    txHash: string;
}
