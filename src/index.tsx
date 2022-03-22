import 'antd/dist/antd.css';
import dva from 'dva';
import './App.global.css';
import './assets/css/animate.css';
const createHistory = require('history').createHashHistory;
const App = dva({
  history: createHistory(),
});

// App.model(require('./models/live2d').default);
// App.model(require('./models/live2dList').default);
// App.model(require('./models/live3dList').default);
// App.model(require('./models/live2dV3').default);
App.model(require('./page/Home/model/model').default);
App.model(require('./page/terminalModel/model').default);
App.router(require('./menu/index').default);

//5.Start
App.start('#root');
