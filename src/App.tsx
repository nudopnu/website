
import React from "react";
import './App.css';
import { ConfigProvider, theme } from "antd";
import Notion from "./components/Notion";


class App extends React.Component {

  render() {
    const themeConfig = {
      algorithm: theme.darkAlgorithm
    };

    return (
      <ConfigProvider theme={themeConfig}>
        <main>
          <Notion pageId="ml" />
        </main>
      </ConfigProvider>
    )
  }
}

export default App
