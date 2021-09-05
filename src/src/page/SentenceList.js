import { Table, Alert, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import React from 'react'
import config from '../config/setting';
import Header from '../component/Header'
import Roads from '../component/Roads'

class SentenceList extends React.Component{
    render(){
        return(
            <div className="container">
                <diw className="row">
                    <Header subTitle="Sentence List" />
                </diw>
                <div className="row">
                    <Roads
                        roads={config.common_road}
                    />
                </div>
                <div className="row">
                    <Button
                        icon={<PlusCircleOutlined />}
                        type="primary"
                        onClick={() => {
                            window.location = "/sentence/create/0"
                        }}
                    >
                        Create New Sentence
                    </Button>
                </div>
            </div>
        );
    }
}

export default SentenceList;
