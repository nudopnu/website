import { Avatar, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Main from "./Main";

export default function Root() {
  return (
    <>
      <header style={{ display: 'flex', paddingLeft: '15px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} items={[
          { title: <Link to={'/'} >Home</Link> },
          // { title: <Link to={'/notes'} >Notes</Link> },
        ]} />
      </header>
      <main>
        <Main />
      </main>
    </>
  );
}