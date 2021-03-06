import React from 'react';
import { connect } from 'dva';
import { Row, Col, Pagination, message } from 'antd';
import MediaQuery from 'react-responsive';
import ArticleCard from '../components/ArticleCard';
import Sidebar from '../components/Sidebar';

import styles from './Home.scss';

class Home extends React.Component {
  componentDidMount() {
    document.title = '和光同尘 | 前端小白';
    if (!window._access) {
      message.success('欢迎来到和光同尘的博客', 1);
      window._access = true;
    }
    this.props.dispatch({
      type: 'article/init',
    });
  }
  handleChange = page => {
    this.props.dispatch({
      type: 'article/showPage',
      payload: page,
    });
  };
  render() {
    const { articles, total } = this.props;
    const main = (
      <div>
        <ArticleCard articles={articles} />
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          defaultPageSize={5}
          total={total}
          onChange={this.handleChange}
          className={styles.pagination}
        />
      </div>
    );
    return (
      <Row>
        <Col span={1} />
        <MediaQuery query="(min-device-width:800px)">
          <Col span={17}>{main}</Col>
          <Col span={5}>
            <Sidebar />
          </Col>
        </MediaQuery>
        <MediaQuery query="(max-device-width:800px)">
          <Col span={22}>
            {main}
          </Col>
        </MediaQuery>
        <Col span={1} />
      </Row>
    );
  }
}

export default connect(state => {
  return {
    articles: state.article.articles,
    total: state.article.total,
  };
})(Home);
