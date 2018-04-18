import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x2b7553efB483d1ae0f283caba7Ed48cD2C1DA8aE"
);

export default instance;
