import { Breadcrumb, Button } from "antd";
import { BgColorsOutlined } from '@ant-design/icons';

import { Link, Outlet } from "react-router-dom";
import Home from "./Home";

export default function Root() {

  const items = [
    { title: <Link to={'/'}>Home</Link> },
  ];

  return (
    <>
      <header style={{ display: 'flex', paddingLeft: '15px', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px' }}>
        <Breadcrumb items={items} />
        <Button size="small" shape="circle" icon={<BgColorsOutlined />} />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}