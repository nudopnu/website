import { Card, Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { Link as RouterLink } from "react-router-dom";
import profile from '../assets/profile.jpg';
import { ids } from "../contents/notion-pages";
import './Home.css';
import Link from "antd/es/typography/Link";
import { MailOutlined } from '@ant-design/icons';

export default function Home() {
    return (
        <>
            <main>
                <section className="about">
                    <div id="profile" style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="profile" src={profile} alt="profile picture" style={{ width: '130px', borderRadius: '10px', height: 'fit-content' }} />
                    </div>
                    <div>
                        <h1>Peter Schramm</h1>
                        <p>
                            Software Developer from Germany
                        </p>
                        <p>
                            Passionate about web-app development.
                            Currently working as a scientific assistant
                            at the University of Applied Sciences in Trier.
                        </p>
                        <p>
                            <Link href="mailto:p.schramm@wir.hochschule-trier.de">
                                <MailOutlined />
                                <span> Contact me</span>
                            </Link>
                        </p>
                    </div>
                </section>
                <Divider />
                <h1>Notes</h1>
                <section className="notes">
                    {Object.keys(ids).map((id) =>
                        <RouterLink to={`notes/${id}`} key={id}>
                            <Card
                                hoverable
                                style={{ width: 140, padding: 20, height: '180px' }}
                                cover={
                                    <img alt="example" src={ids[id as keyof typeof ids].icon} style={{ height: 50, objectFit: 'contain', padding: '0 0 20px' }} />
                                }
                            >
                                <Meta title={id} description={ids[id as keyof typeof ids].description} />
                            </Card>
                        </RouterLink>
                    )}
                </section>
            </main>
        </>
    )
}