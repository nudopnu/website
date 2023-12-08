import { Avatar, Card, Divider } from "antd";
import { ids } from "./notion-pages";
import Meta from "antd/es/card/Meta";
import './Home.css';
import { Link } from "react-router-dom";
import profile from '../assets/profile_small.jpg';

export default function Home() {
    return (
        <>
            <Avatar size={64} src={profile} />
            <main>
                <h1>Peter Schramm</h1>
                <section className="about">
                </section>
                <Divider />
                <h1>Notes</h1>
                <section className="notes">
                    {Object.keys(ids).map((id) =>
                        <Link to={`notes/${id}`} key={id}>
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