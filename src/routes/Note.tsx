import { NotionRenderer } from "react-notion-x";
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-python';
import '../components/Notion.css';
import { ids } from "./notion-pages";

type Props = {
    params: {
        pageId: keyof typeof ids;
    };
};

export async function loader({ params }: Props) {
    const response = await fetch(`https://notion-api.splitbee.io/v1/page/${ids[params.pageId].id}`);
    const blockMap = await response.json();
    return { blockMap };
}

export default function Note() {
    const { blockMap } = useLoaderData() as any;
    return (
        <NotionRenderer showTableOfContents={true} recordMap={{ block: blockMap } as any} components={{
            Code,
            Equation,
        }} fullPage={true} darkMode={true} header={<Header blockMap={blockMap} />} disableHeader />
    );
}