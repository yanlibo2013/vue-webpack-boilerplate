import { pk } from "../../mutation-types/index";

//导航菜单数据项
export const getNavData = ({ commit }, data) => {
  console.log("ACTION",data);
  commit(pk.GET_NAV_DATA, data);
};
