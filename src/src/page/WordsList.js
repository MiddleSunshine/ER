import { Table, Alert, Breadcrumb, Button } from 'antd';
import React from 'react'
import config from '../config/setting';
import Header from '../component/Header'

class WordsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'ID',
                    key: 'ID'
                },
                {
                    title: 'Word',
                    dataIndex: 'word',
                    key: 'word'
                },
                {
                    title: 'Explain',
                    dataIndex: 'explain',
                    key: 'explain'
                },
                {
                    title: 'AddTime',
                    dataIndex: 'AddTime',
                    key: 'AddTime'
                },
                {
                    title: 'Option',
                    dataIndex: 'ID',
                    key: 'key',
                    render: (text, record) => {

                    }
                }
            ]
        }
        this.getWordsList = this.getWordsList.bind(this);
    }
    componentDidMount() {
        this.getWordsList();
    }
    getWordsList() {
        fetch(config.back_domain + "/index.php?action=words&method=list")
            .then(
                (res) => {
                    res.json().then((json) => {
                        console.log(json.Data);
                        this.setState({
                            data: json.Data
                        })
                    });
                }
            ).catch((err) => {
                // Alert();
                console.error(err);
            })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Header subTitle="Word List" />
                </div>
                <div className="row">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="/">Home</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/web">Web Index</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/words/list">Web Index</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row">

                </div>
                <div className="row">
                    <Table
                        dataSource={this.state.data}
                        columns={this.state.columns}
                    />
                </div>
            </div>
        );
    }
}

export default WordsList;
