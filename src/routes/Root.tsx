import { BgColorsOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, ConfigProvider, Divider, theme } from "antd";
import React, { useState } from 'react';
import { PageIcon } from 'react-notion-x';
import { Link, Outlet, useLocation } from "react-router-dom";
import './Root.css';

class RootComponent extends React.Component<{ pathname: string, blockMap: any, setBlockMap: any }>{

  state = {
    darkmode: true,
  };

  getItemsFromPathname(pathname: string, blockMap?: any) {
    if (blockMap) {
      const pageBlock = Object.values<any>(blockMap).filter(e => e.value.type === 'page')[0].value;
      const title = pageBlock.properties.title[0] as string;
      return [
        { title: <Link to={'/'} >Home</Link> },
        { title: 'Notes', path: 'Notes' },
        {
          title: (
            <div style={{ 'display': 'flex', 'gap': '4px' }}>
              <PageIcon className='icon' block={pageBlock} /><span>{title}</span>
            </div>
          ),
        },
      ];
    }
    return [
      { title: <Link to={'/'}>Home</Link> },
      ...pathname
        .split('/')
        .filter(e => e)
        .map(name => ({
          title: <Link to={'/'}>{name.at(0)?.toUpperCase() + name.slice(1)}</Link>
        })),
    ];
  }

  onToggleDarkmode() {
    const darkmode = !this.state.darkmode;
    this.setState({ ...this.state, darkmode });
    if (darkmode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  render(): React.ReactNode {

    const { pathname, blockMap, setBlockMap } = this.props;
    const items = this.getItemsFromPathname(pathname, blockMap);
    const { darkmode } = this.state;
    const themeConfig = {
      algorithm: darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
    if (darkmode) {
      document.body.classList.add('dark-mode');
    }

    return (
      <>
        <ConfigProvider theme={themeConfig}>
          <header id='root'>
            <nav style={{ padding: '0 16px' }}>
              <Breadcrumb items={items} />
              <Button onClick={this.onToggleDarkmode.bind(this)} size="small" shape="circle" icon={<BgColorsOutlined />} />
            </nav>
            <Divider />
          </header>
          <main>
            <Outlet context={{ setBlockMap, darkmode }} />
          </main>
        </ConfigProvider>
      </>
    );
  }
}


export default function Root() {
  const { pathname } = useLocation();
  const [blockMap, setBlockMap] = useState();

  return <RootComponent pathname={pathname} blockMap={blockMap} setBlockMap={setBlockMap} />;
}