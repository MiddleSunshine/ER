import React from 'react';
import config from "../config/setting";
import {Form, Input, Button, Row, Col,Modal} from 'antd';
import {SaveOutlined, EditOutlined,FormOutlined,DeleteOutlined} from '@ant-design/icons'
import WordModel from "./WordModel";

const marked = require("marked");

class Sentence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            sentenceData: {},
            editNote: false,
            wordsList:[],
            wordsCount:0,
            visible:false,
            updateWord:''
        }
        this.getSentenceDetail = this.getSentenceDetail.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.updateMarkdownHtml = this.updateMarkdownHtml.bind(this);
        this.saveSentence = this.saveSentence.bind(this);
        this.addWords=this.addWords.bind(this);
        this.deleteWord=this.deleteWord.bind(this);
        this.updateWord=this.updateWord.bind(this);
        this.updateWordDetail=this.updateWordDetail.bind(this);
    }

    getSentenceDetail(id) {
        if (id==0 || id==undefined){
            return false;
        }
        fetch(
            config.back_domain + "/index.php?action=sentence&method=detail&id=" + id
        ).then((res) => {
            res.json().then((json) => {
                this.setState({
                    sentenceData: json.Data,
                    id:id
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
        let sentence = this.state.sentenceData;
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
            sentenceData: sentence
        });
    }

    updateMarkdownHtml() {
        if (!this.state.editNote) {
            if (this.state.sentenceData.note && this.state.sentenceData.note.length) {
                document.getElementById(this.state.sentenceData.id + "_sentence_note").innerHTML = marked(this.state.sentenceData.note);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMarkdownHtml();
    }

    saveSentence() {
        console.log(this.state.sentenceData);
        fetch(config.back_domain+"/index.php?action=sentence&method=save&id="+this.state.id,{
            method:"post",
            body:JSON.stringify(this.state.sentenceData)
        }).then((res)=>{
            res.json().then((json)=>{
                this.getSentenceDetail(json.Data.ID);
            })
        }).catch((error)=>{
            console.error(error);
        })
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
    deleteWord(index){
        let words=[];
        let count=0;
        for (let i=0;i<this.state.wordsCount;i++){
            if(i!==index){
                words[count]=this.state.wordsList[i];
                count++;
            }
        }
        this.setState({
            wordsList:words,
            wordsCount:count
        });
    }

    updateWord(event,index){
        let words=this.state.wordsList;
        words[index].value=event.target.value;
        this.setState({
            wordsList:words
        });
    }

    updateWordDetail(index){
        this.setState({
            updateWord:this.state.wordsList[index].value
        });
        this.setState({
            visible:true
        });
    }

    render() {
        // note 部分管理
        var notePart = <div></div>;
        if (this.state.editNote) {
            notePart = <div>
                <textarea
                    className="markdown-textarea"
                    value={this.state.sentenceData.note}
                    onChange={(event) => this.handleValueChange(event, 'note')}
                />
            </div>;
        } else {
            notePart = <div className="markdown-preview">
                <div id={this.state.sentenceData.ID + "_sentence_note"}></div>
            </div>;
        }
        // words部分管理
        let words=this.state.wordsList.map((value,index)=>{
            return <Row key={index} justify="center" alian={"center"} style={{paddingTop:"10px"}}>
                        <Col span={19}>
                            <Input
                                value={this.state.wordsList[index].value}
                                style={{height:"100%"}}
                                onChange={(e)=>this.updateWord(e,index)}
                            />
                        </Col>
                        <Col offset={1} span={4}>
                            <Button
                                size={"small"}
                                type={"link"}
                                shape={"round"}
                                icon={<EditOutlined />}
                                onClick={()=>this.updateWordDetail(index)}
                            >
                            </Button>
                            <Button
                                icon={<DeleteOutlined />}
                                size={"small"}
                                type={"link"}
                                shape={"round"}
                                onClick={()=>this.deleteWord(index)}
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
                            <h3>ID:{this.state.sentenceData.ID}</h3>
                            <h3>AddTime:{this.state.sentenceData.AddTime}</h3>
                            <h3>LastUpdateTime:{this.state.sentenceData.LastUpdateTime}</h3>
                        </div>
                        <div className="row">
                            <Form
                                layout="vertical"
                            >
                                <Form.Item label="Sentence">
                                    <Input
                                        placeholder="Sentence"
                                        value={this.state.sentenceData.sentence}
                                        onChange={(e) => this.handleValueChange(e, 'sentence')}
                                    />
                                </Form.Item>
                                <Form.Item label="Source">
                                    <Input
                                        placeholder="Source"
                                        value={this.state.sentenceData.source}
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
                        <Row style={{marginTop:"10px"}}>
                            <Button
                                icon={<SaveOutlined/>}
                                type="primary"
                            >
                                Save Words
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <div>
                    <Modal
                        visible={this.state.visible}
                        onCancel={()=>{
                            this.setState({
                                visible:false
                            })
                        }}
                        onOk={()=>{
                            this.setState({
                                visible:false
                            })
                        }}
                    >
                        <WordModel
                            word={this.state.updateWord}
                        />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Sentence;