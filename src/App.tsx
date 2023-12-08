
import { Button, ConfigProvider, Result, theme } from "antd";
import React from "react";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import './App.css';
import { Params } from "./lib/params.type";
import Home from "./routes/Home";
import Note from "./routes/Note";
import Root from "./routes/Root";

export async function defaultLoader<T>({ params }: Params<T>) {
  return { ...params };
}

const routes = [
  {
    path: '/',
    element: <Root />,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to={'/'}><Button type="primary">Back Home</Button></Link>} />
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'notes/:pageId',
        element: <Note />,
        loader: defaultLoader,
      },
    ]
  },
];

class App extends React.Component {

  state = {
    darkmode: true,
  };

  render() {
    const { darkmode } = this.state;
    const themeConfig = {
      algorithm: darkmode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
    if (darkmode) {
      document.body.classList.add('dark-mode');
    }
    const router = createBrowserRouter(routes);

    return (
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    )
  }
}

export default App
