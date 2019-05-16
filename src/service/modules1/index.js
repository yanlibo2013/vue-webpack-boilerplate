import request from "@/utils/request";

export const list = data => {
  return request({
    url: "/list",
    method: "post",
    data
  });
};
