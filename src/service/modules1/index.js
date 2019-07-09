import request from "@/utils/request";

export const list = data => {
  return request({
    url: "/list",
    method: "post",
    data
  });
};


export const flowChart = data => {
  return request({
    url: "/flow",
    method: "post",
    data
  });
};
