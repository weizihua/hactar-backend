import {GeneralMinerInfo} from "../Models/GeneralMinerInfo";

export class GeneralMinerInfoService {

    public async updateOrCreateGeneralMinerInfo(
        version: string, walletAddress: string,
        sectorSize: string, numberOfSectors: number,
        minerPower: string, totalPower: string, nodeId: number
    ) {
        const node = await this.fetchGeneralMinerInfo(nodeId);
        if (node) {
            const updatedNode = await GeneralMinerInfo.update(
                {version, walletAddress, sectorSize, numberOfSectors, minerPower, totalPower, nodeId},
                {
                    where: {
                        nodeId
                    },
                    returning: true,
                });
            return await updatedNode[1][0]; // returns the updated object, without updates count
        }
        return await GeneralMinerInfo.create(
            {version, walletAddress, sectorSize, numberOfSectors, minerPower, totalPower, nodeId}
        );
    }

    public async fetchGeneralMinerInfo(nodeId: number) {
        return await GeneralMinerInfo.findOne({
            raw: true,
            where: {
                nodeId
            }
        })
    }
}
