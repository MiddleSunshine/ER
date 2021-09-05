import React from 'react';
import config from "../config/setting";
import {Form, Input, Button, Row, Col} from 'antd';
import {SaveOutlined, EditOutlined,FormOutlined} from '@ant-design/icons'

const marked = require("marked");

class Sentence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            sentence: {},
            editNote: false,
            wordsList:[],
            wordsCount:0
        }
        this.getSentenceDetail = this.getSentenceDetail.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateMarkdownHtml = this.updateMarkdownHtml.bind(this);
        this.saveSentence = this.saveSentence.bind(this);
        this.addWords=this.addWords.bind(this);
    }

    getSentenceDetail(id) {
        fetch(
            config.back_domain + "/index.php?action=sentence&method=detail&id=" + id
        ).then((res) => {
            res.json().then((json) => {
                this.setState({
                    sentence: json.Data
                })
            })
        }).catch((error) => {
            console.error(error);
        })
    }

    componentDidMount() {
        this.getSentenceDetail(this.state.id);
    }

    handleValueChange(event, type) {
        let sentence = this.state.sentence;
        let value = event.target.value;
        switch (type) {
            case 'note':
                sentence.note = value;
                break;
            case 'sentence':
                sentence.sentence = value;
                break;
            case 'source':
                sentence.source = value;
                break;
        }
        this.setState({
            sentence: sentence
        });
    }

    updateMarkdownHtml() {
        if (!this.state.editNote) {
            if (this.state.sentence.note && this.state.sentence.note.length) {
                document.getElementById(this.state.sentence.id + "_sentence_note").innerHTML = marked(this.state.sentence.note);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMarkdownHtml();
    }

    saveSentence() {

    }

    addWords(){
        let words=this.state.wordsList;
        words[this.state.wordsCount]={
            id:0,
            word:''
        };
        this.setState({
            wordsList:words,
            wordsCount:this.state.wordsCount+1
        });
    }

    render() {
        // note 部分管理
        var notePart = <div></div>;
        if (this.state.editNote) {
            notePart = <div>
                <textarea
                    className="markdown-textarea"
                    value={this.state.sentence.note}
                    onChange={(event) => this.handleValueChange(event, 'note')}
                />
            </div>;
        } else {
            notePart = <div className="markdown-preview">
                <div id={this.state.sentence.ID + "_sentence_note"}></div>
            </div>;
        }
        // words部分管理
        let words=this.state.wordsList.map((value,index)=>{
            return <Row key={index} justify="center" alian={"center"} style={{paddingTop:"10px"}}>
                        <Col span={19}>
                            <Input />
                        </Col>
                        <Col offset={1} span={4}>
                            <Button
                                style={{height:"100%"}}
                                size={"small"}
                                type={"primary"}
                                shape={"round"}
                                icon={<EditOutlined />}
                            >
                            </Button>
                        </Col>
                    </Row>
        })
        return (
            <div className="container">
                <Row>
                    <Col span={15}>
                        <div className="row">
                            <h3>ID:{this.state.sentence.ID}</h3>
                            <h3>AddTime:{this.state.sentence.AddTime}</h3>
                            <h3>LastUpdateTime:{this.state.sentence.LastUpdateTime}</h3>
                        </div>
                        <div className="row">
                            <Form
                                layout="vertical"
                            >
                                <Form.Item label="Sentence">
                                    <Input
                                        placeholder="Sentence"
                                        value={this.state.sentence.sentence}
                                        onChange={(e) => this.handleValueChange(e, 'sentence')}
                                    />
                                </Form.Item>
                                <Form.Item label="Source">
                                    <Input
                                        placeholder="Source"
                                        value={this.state.sentence.source}
                                        onChange={(e) => this.handleValueChange(e, 'source')}
                                    />
                                </Form.Item>
                                <Form.Item label="Note">
                                    <Button
                                        icon={<EditOutlined/>}
                                        type="primary"
                                        onClick={() => {
                                            this.setState({
                                                editNote: !this.state.editNote
                                            })
                                        }}
                                    >
                                        {this.state.editNote ? 'Finish' : 'Edit'}
                                    </Button>
                                    {notePart}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        icon={<SaveOutlined/>}
                                        type="primary"
                                        onClick={() => this.saveSentence()}
                                    >
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col offset={1} span={8}>
                        <Row>
                            <Button
                                icon={<FormOutlined />}
                                type="primary"
                                onClick={()=>this.addWords()}
                            >
                                New Words
                            </Button>
                        </Row>
                        <Row>
                            {words}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Sentence;