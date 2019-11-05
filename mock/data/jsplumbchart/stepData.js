export const stepData = [
  {
    id: "rtc_source",
    name: "rtc_source",
    type: "source",
    tags: ["IO", "rtcflow"],
    stepSettings: {},
    outputConfigurations: {
      output: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_filter",
    name: "rtc_filter",
    type: "filter",
    tags: ["Transform", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_aggregate",
    name: "rtc_aggregate",
    type: "aggregate",
    tags: ["Transform", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_transform",
    name: "rtc_transform",
    type: "transform",
    tags: ["Transform", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_sql",
    name: "rtc_sql",
    type: "sql",
    tags: ["Transform", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_sink",
    name: "rtc_sink",
    type: "sink",
    tags: ["IO", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_multi_output",
    name: "rtc_multi_output",
    type: "multioutput",
    tags: ["MULT", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output1: [{ column: "", type: "", alias: "", description: "" }]
    }
  },
  {
    id: "rtc_group_chart",
    name: "rtc_group_chart",
    type: "group",
    tags: ["Group", "rtcflow"],
    stepSettings: {},
    inputConfigurations: {
      input: [{ column: "", type: "", alias: "", description: "" }]
    },
    outputConfigurations: {
      output1: [{ column: "", type: "", alias: "", description: "" }]
    }
  }
];
