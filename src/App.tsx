
import { Button, ConfigProvider, Result, theme } from "antd";
import React from "react";
import './App.css';
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Note, { loader as notesLoader } from "./routes/Note";
import Root from "./routes/Root";

class App extends React.Component {

  render() {
    const themeConfig = {
      algorithm: theme.darkAlgorithm
    };
    document.body.classList.add('dark-mode');
    const router = createBrowserRouter([
      {
        path: '/',
        element: <Root />,
        errorElement: (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={'/'}><Button type="primary">Back Home</Button></Link>}
          />
        )
      },
      {
        path: 'notes/:pageId',
        element: <Note/>,
        loader: notesLoader as any,
      }
    ]);

    return (
      <ConfigProvider theme={themeConfig}>
        <RouterProvider router={router} />
      </ConfigProvider>
    )
  }
}

export default App
