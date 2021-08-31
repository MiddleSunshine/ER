import { Layout } from 'antd';
import React from 'react'

const { Header, Footer, Sider, Content } = Layout;


class App extends React.Component {
  render() {
    return (
      <Layout>
                  <Header>Header</Header>
                  <Content>Content</Content>
                  <Footer>Footer</Footer>
                </Layout>
    )
  }
}

export default App;
