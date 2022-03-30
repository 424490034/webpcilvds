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
App.model(require('./page/web/pc/model').default);
App.model(require('./page/web/rest/model').default);
App.model(require('./page/web/mobile/model').default);
App.model(require('./page/web/serve/model').default);
App.model(require('./page/project/addNew/model').default);
App.model(require('./page/project/haveOld/model').default);
App.model(require('./page/Home/model/model').default);
App.model(require('./page/terminalModel/model').default);
App.router(require('./menu/index').default);

//5.Start
App.start('#root');
