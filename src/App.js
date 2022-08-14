
import './App.less';
import Index from "./view";
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
function App() {
  return (
      <ConfigProvider locale={zhCN}>
          <div className="App">
              <Index/>
          </div>
      </ConfigProvider>
  );
}

export default App;
