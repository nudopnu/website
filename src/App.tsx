
import React from "react";
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-bash'
import './App.css';
import { Breadcrumb, ConfigProvider, theme } from "antd";
import Header from "./components/Header";


const ids = {
  'git': '62f675e9dca84b8488f8db38344e175e',
  'ml': 'a04548b962ae4d259c55e1d58dd59215',
};

class App extends React.Component<{}, { blockMap: any }> {

  constructor(props: {}) {
    super(props);
    this.state = {
      blockMap: undefined,
    };
  }

  async componentDidMount() {
    if (this.state.blockMap !== undefined) return;
    const response = await fetch(`https://notion-api.splitbee.io/v1/page/${ids['git']}`);
    const blockMap = await response.json();
    console.log(blockMap);
    this.setState({ blockMap });
  }

  render() {
    const { blockMap } = this.state;

    return (
      <>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm
          }}
        >
          <main>
            {blockMap ?
              <NotionRenderer showTableOfContents={true} recordMap={{ block: blockMap } as any} components={{
                Code,
                Collection,
                Equation,
                Modal,
                Pdf
              }} fullPage={true} darkMode={true} header={<Header blockMap={blockMap}/>} disableHeader />
              :
              <p>loading...</p>
            }
          </main>
        </ConfigProvider>

      </>
    )
  }
}

export default App
