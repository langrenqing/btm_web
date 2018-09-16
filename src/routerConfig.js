// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderFooterLayout from './layouts/HeaderFooterLayout';
import Dashboard from './pages/Dashboard';
import BlockDetail from './pages/Block/BlockDetail';
import NotFound from './pages/NotFound';

const routerConfig = [
  {
    path: '/',
    layout: HeaderFooterLayout,
    component: Dashboard,
  },
  {
    path: '/block/:value',
    layout: HeaderFooterLayout,
    component: BlockDetail,
  },
  {
    path: '*',
    layout: HeaderFooterLayout,
    component: NotFound,
  },
];

export default routerConfig;
