import { NotionRenderer } from "react-notion-x";
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { useLoaderData, useParams } from "react-router-dom";
import Header from "../components/Header";
import { Skeleton } from 'antd';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-python';
import '../components/Notion.css';
import { ids } from "./notion-pages";
import React from "react";
import { Params } from "../lib/params.type";

type NoteProps = {
    pageId: keyof typeof ids;
};

export async function loader({ params }: Params<NoteProps>) {
    const { pageId } = params;
    return { pageId };
}


class NoteComponent extends React.Component<NoteProps> {

    state = {
        blockMap: undefined,
    };

    async componentDidMount(): Promise<void> {
        const { pageId } = this.props;
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${ids[pageId].id}`);
        const blockMap = await response.json();
        this.setState((state) => ({ ...state, blockMap }));
    }

    render(): React.ReactNode {
        const { blockMap } = this.state;

        return (
            <>
                {blockMap ?
                    <NotionRenderer showTableOfContents={true} recordMap={{ block: blockMap } as any} components={{
                        Code,
                        Equation,
                    }} fullPage={true} darkMode={true} header={<Header blockMap={blockMap} />} disableHeader />
                    :
                    <article>
                        <Skeleton active />
                    </article>
                }
            </>
        );
    }
}

export default function Note() {
    return <NoteComponent {...(useParams() as NoteProps)} />;
}