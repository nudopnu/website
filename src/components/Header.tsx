import { Breadcrumb } from "antd";
import { PageIcon } from 'react-notion-x';


export default function Header({ blockMap }: any) {

    function getBlock() {
        return Object.values<any>(blockMap).filter(e => e.value.type === 'page')[0].value;
    }

    function getTitle() {
        return Object.values<any>(blockMap).filter(e => e.value.type === 'page')[0].value.properties.title[0] as string;
    }

    return (
        <header className='notion-header' style={{ display: 'flex', paddingLeft: '15px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} items={[
                { title: 'Home', path: 'Home' },
                { title: 'Notes', path: 'Notes' },
                {
                    title: (
                        <div style={{ 'display': 'flex', 'gap': '4px' }}>
                            <PageIcon className='icon' block={getBlock()} /><span>{getTitle()}</span>
                        </div>
                    ),
                },
            ]}/>
        </header>
    );
}