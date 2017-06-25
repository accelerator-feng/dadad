import React from 'react';
import { Menu, Row, Col, Icon, Button, Dropdown } from 'antd';
import { Link } from 'dva/router';
import MediaQuery from 'react-responsive';

// import Login from '../Login';

import styles from './index.css';
import logo from '../../assets/logo.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'look' };
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
    if (e.key === 'login') {
      this.props.dispatch({
        type: 'user/show',
        payload: { isModalVisible: true },
      });
    }
  };

  handleLogout = () => {
    this.props.dispatch({
      type: 'user/logout',
    });
  };

  render() {
    const { hasLogined, NickUserName } = this.props;
    const userShow = hasLogined
      ? <Menu.Item key="logout">
          <Button type="primary">
            {NickUserName}
          </Button>
          <Button onClick={this.handleLogout}>
            退出
          </Button>
        </Menu.Item>
      : <Menu.Item key="login">
          <Icon type="login" />注册/登陆
        </Menu.Item>;
    const menu = (
      <Menu>
        <Menu.Item key="index">
          <Link to="/">主页</Link>
        </Menu.Item>
        <Menu.Item key="archives">
          <Link to="/archives">归档</Link>
        </Menu.Item>
        <Menu.Item key="categories">
          <Link to="/categories">分类</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    );
    const title = (
      <Link href="/">
        <img src={logo} alt="logo" className={styles.logo} />
        <span className={styles.title}>和光同尘</span>
        <span className={styles.desc}>前端小白的学习笔记</span>
      </Link>
    );
    return (
      <Row className={styles.container}>
        <MediaQuery query="(min-device-width:800px)">
          <Col span={1} />
          <Col span={9}>{title}</Col>
          <Col span={13}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
              theme="dark"
              style={{
                position: 'absolute',
                bottom: '-140px',
                fontSize: '15px',
                right: 0,
              }}
            >
              <Menu.Item key="home">
                <Link to="/"><Icon type="appstore" />主页</Link>
              </Menu.Item>
              <Menu.Item key="archives">
                <Link to="/archives"><Icon type="appstore" />归档</Link>
              </Menu.Item>
              <Menu.Item key="categories">
                <Link to="/categories"><Icon type="appstore" />分类</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link to="/about"><Icon type="appstore" />关于</Link>
              </Menu.Item>
              {userShow}
            </Menu>
          </Col>
          <Col span={1} />
        </MediaQuery>
        <MediaQuery query="(max-device-width:800px)">
          <Col span={1} />
          <Col span={17}>
            {title}
          </Col>
          <Col span={5}>
            <Dropdown overlay={menu} placement="bottomRight">
              <Icon type="menu-fold" className={styles.menu} />
            </Dropdown>
          </Col>
          <Col span={1} />
        </MediaQuery>
      </Row>
    );
  }
}
