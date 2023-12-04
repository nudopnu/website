import { Avatar, Card, Divider } from "antd";
import { ids } from "./notion-pages";
import Meta from "antd/es/card/Meta";
import './Main.css';
import { Link } from "react-router-dom";

export default function Main() {
    return (
        <>
            <Avatar size={64} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
            <main>
                <section className="about">
                    <h1>Hi, I'm a software developer</h1>
                </section>
                <section className="notes">
                    {Object.keys(ids).map((id) =>
                        <Link to={`notes/${id}`}>
                            <Card
                                hoverable
                                style={{ width: 140, padding: 20, height: '180px' }}
                                cover={
                                    <img alt="example" src={ids[id as keyof typeof ids].icon} style={{ height: 50, objectFit: 'contain', padding: '0 0 20px' }} />
                                }
                            >
                                <Meta title={id} description={ids[id as keyof typeof ids].description} />
                            </Card>
                        </Link>
                    )}
                </section>
            </main>
        </>
    )
}