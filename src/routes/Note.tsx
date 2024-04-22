import { NotionRenderer } from "react-notion-x";
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { useOutletContext, useParams } from "react-router-dom";
import { Skeleton } from 'antd';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-python';
import '../components/Notion.css';
import { ids } from "../contents/notion-pages";
import React from "react";
import { Params } from "../lib/params.type";
import './Note.css';

const DarkTheme = React.lazy(() => import('./PrismDarkTheme'));
const LightTheme = React.lazy(() => import('./PrismLightTheme'));

type NoteProps = {
    pageId: keyof typeof ids;
    darkmode: boolean;
    setBlockMap: any;
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
        const { pageId, setBlockMap } = this.props;
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${ids[pageId].id}`);
        const blockMap = await response.json();
        this.setState((state) => ({ ...state, blockMap }), () => this.fixAnchors(pageId));
        setBlockMap(blockMap);
    }

    private fixAnchors(pageId: string) {
        document.querySelectorAll('a').forEach(link => {
            if (link.href.indexOf('#') !== -1) {
                link.href = `/notes/${pageId}#${link.href.split('#')[1]}`;
            }
        });
    }

    componentWillUnmount(): void {
        const { setBlockMap } = this.props;
        setBlockMap(undefined);
    }

    render(): React.ReactNode {
        const { blockMap } = this.state;
        const { darkmode } = this.props;

        const ThemeComponent = darkmode ? DarkTheme : LightTheme;

        const PlaceHolder = <article id="placeholder">
            <Skeleton active />
            <Skeleton active />
            <div style={{ height: '50px' }}></div>
            <Skeleton active />
            <Skeleton active />
        </article>;

        return (
            <>
                {blockMap ?
                    <>
                        <React.Suspense fallback={PlaceHolder}>
                            <ThemeComponent />
                            <NotionRenderer showTableOfContents={true} recordMap={{ block: blockMap } as any} components={{
                                Code,
                                Equation,
                            }} fullPage={true} darkMode={darkmode} disableHeader={true} />
                        </React.Suspense>
                    </>
                    :
                    PlaceHolder
                }
            </>
        );
    }
}

export default function Note() {
    return <NoteComponent {...({ ...useParams(), ...useOutletContext() } as NoteProps)} />;
}