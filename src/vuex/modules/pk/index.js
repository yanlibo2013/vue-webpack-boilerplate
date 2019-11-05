import { pk } from '../../mutation-types/index';

const history = {
  state: {
    navData:[]
    // navData: [{
    //   path: '/',
    //   name: '权限管理',
    //   iconCls: 'icon iconfont icon-ir-attestation nav',
    // }],
  },
  mutations: {
    [pk.GET_NAV_DATA](state, data) {

      console.log("mutations",data);

      state.navData = data;
    }
  }
}

export default history;
