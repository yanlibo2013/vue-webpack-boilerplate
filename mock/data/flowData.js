export const flowData = {
  id: "20053ae4-8134-47e4-bdee-d168437d9de5",
  name: "tc_df_oo",
  flowType: "dataflow",
  steps: [
    {
      id: "source_2",
      name: "source_2",
      type: "source",
      x: 84,
      y: 81,
      otherConfigurations: {},
      inputConfigurations: [],
      outputConfigurations: []
    },
    {
      id: "sink_3",
      name: "sink_3",
      type: "sink",
      x: 457,
      y: 98,
      otherConfigurations: {},
      inputConfigurations: [],
      outputConfigurations: []
    }
  ],
  links: [
    {
      name: "con_128",
      source: "source_2",
      sourceOutput: "output",
      target: "sink_3",
      targetInput: "input",
      input: "input"
    }
  ],
  oid: "$null",
  creator: "admin",
  createTime: 1559501740000,
  lastModifier: "admin",
  lastModifiedTime: 1561020270000,
  owner: "601a71e6-d6af-491c-ae3c-f70a939385de",
  version: 2,
  enabled: 0,
  moduleVersion: 0,
  tenant: {
    id: "55f7f910-b1c9-41d2-9771-e734e6b8285f",
    name: "default",
    creator: "root",
    createTime: 1559138723000,
    lastModifier: "root",
    lastModifiedTime: 1559731815000,
    owner: "af9b0954-51ef-40c9-aac6-39390b91bcc9",
    version: 1,
    moduleVersion: 0,
    enabled: 1,
    resourceQueues: ["default", "merce.normal"],
    hdfsSpaceQuota: 0,
    zid: "",
    expiredPeriod: 0
  },
  tableName: "merce_flow",
  isHide: 0,
  expiredPeriod: 0
};
