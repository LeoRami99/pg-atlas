import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { attestationType } from "../../types/attestation.type";

const client = new SignProtocolClient(SpMode.OnChain, {
  chain: EvmChains.celoAlfajores,
});

const projectSchemaId: string = "0x27";

export function ethSignService() {
  const getAttestation = async (attestationId: string) => {
    try {
      const info = await client.getAttestation(attestationId);
      return info;
    } catch (error) {
      console.error(error);
    }
  };

  const getProjectSchema = async () => {
    try {
      const schema = await client.getSchema(projectSchemaId);
      return schema;
    } catch (error) {
      console.error(error);
    }
  };

  const attestProject = async (data: attestationType) => {
    try {
      const info = await client.createAttestation({
        schemaId: projectSchemaId,
        data,
        indexingValue: "",
      });

      return info.attestationId;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getAttestation,
    getProjectSchema,
    attestProject,
  };
}

/*

const data = {
    name: 'Solar Energy Initiative',
    organizationType: 'Non-profit',
    date: '2024-11-02',
    region: 'Latin America',
    country: 'Argentina',
    description: 'A public good project focused on providing affordable solar energy solutions to rural communities.',
    website: 'https://solarinitiative.org',
    energyCategory: 'Renewable Energy',
    subCategory: 'Solar',
    blockchain: 'Celo',
    ods: ['7', '13'], // ODS for affordable energy and climate action
    latitude: '-34.6037',
    longitude: '-58.3816',
    wallet: '0xABCDEF1234567890abcdef1234567890ABCDEF12'
};

*/
