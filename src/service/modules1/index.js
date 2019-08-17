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

export const stepData = data => {
  return request({
    url: "/stepdata",
    method: "post",
    data
  });
};

export const dataFlow = data => {
  return request({
    url: "/dataflow",
    method: "post",
    data
  });
};
