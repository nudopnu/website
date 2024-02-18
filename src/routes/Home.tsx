import { Card, Divider } from "antd";
import Meta from "antd/es/card/Meta";
import { Link as RouterLink } from "react-router-dom";
import profile from '../assets/profile.jpg';
import { ids } from "../contents/notion-pages";
import './Home.css';
import Link from "antd/es/typography/Link";
import { MailOutlined, GithubOutlined } from '@ant-design/icons';

export default function Home() {
    return (
        <>
            <main>
                <section className="about">
                    <div id="profile" style={{ display: 'flex', alignItems: 'center' }}>
                        <img className="profile" src={profile} alt="profile picture" style={{ width: '130px', borderRadius: '10px', height: 'fit-content', maxHeight: '200px' }} />
                    </div>
                    <div>
                        <h1>Peter Schramm</h1>
                        <p>
                            Software Developer from Germany
                        </p>
                        <p>
                            Passionate about web-app development.
                            Currently working as a Research Associate 
                            at the University of Applied Sciences in Trier.
                        </p>
                        <p>
                            <Link href="mailto:peter_schramm@live.de">
                                <MailOutlined />
                                <span> Mail </span>
                            </Link>
                            <Link href="https://github.com/nudopnu" target="_blank">
                                <GithubOutlined />
                                <span> GitHub </span>
                            </Link>
                        </p>
                    </div>
                </section>
                <Divider />
                <h1>Notes</h1>
                <p className="block">
                    "I like taking notes while learning a new technology. I often refer to them when I have to redo a certain task that I've already done before. Here, I published some of them to have them available everywhere I go. Maybe you will find something useful in it."
                </p>
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