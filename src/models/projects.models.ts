export interface Project {
    projectName: string;
    organizationType: string;
    date: string;
    city?: string;
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
    activityStatus: string;
    blockchainImages: string[];
    [key: `sdgGoal${number}`]: string;
    bfgid: string | "N/A";
    source: string | "N/A";
    latitude: number;
    longitude: number;
    wallet: string;
    attestationId?: string;
    donations: donationType[];

}


export type donationType = {
    donatorAddress: string;
    amount: number;
    date: string;
    txHash: string;
}
