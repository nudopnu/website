
import React from "react";
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import { ConfigProvider, theme } from "antd";
import Header from "./Header";
import "./Notion.css";

const ids = {
    git: '62f675e9dca84b8488f8db38344e175e',
    ml: 'a04548b962ae4d259c55e1d58dd59215',
    notes: '2b8b2bae1a7d4199b26e1479ef9cf351',
    docker: '0e85c98660154326b950a51d2d148360',
};

export default class Notion extends React.Component<{ pageId: keyof typeof ids }, { blockMap: any }> {

    async componentDidMount() {
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${ids[this.props.pageId]}`);
        const blockMap = await response.json();
        console.log(blockMap);
        this.setState({ blockMap });
    }

    render() {
        return (
            <>
                <ConfigProvider
                    theme={{
                        algorithm: theme.darkAlgorithm
                    }}
                >
                    <main>
                        {this.state ?
                            <NotionRenderer showTableOfContents={true} recordMap={{ block: this.state.blockMap } as any} components={{
                                Code,
                                Collection,
                                Equation,
                                Modal,
                                Pdf
                            }} fullPage={true} darkMode={true} header={<Header blockMap={this.state.blockMap} />} disableHeader />
                            :
                            <p>loading...</p>
                        }
                    </main>
                </ConfigProvider>

            </>
        )
    }
}
