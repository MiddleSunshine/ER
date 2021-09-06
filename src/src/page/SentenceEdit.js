import React from "react";
import Header from "../component/Header";
import Roads from "../component/Roads";
import config from "../config/setting";
import Sentence from "../component/Sentence";
import {Button, Col, Input, Modal, Row} from "antd";
import {DeleteOutlined, EditOutlined,FormOutlined,SaveOutlined} from "@ant-design/icons";
import WordModel from "../component/WordModel";

class SentenceEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.id,
            wordsList:[],
            wordsCount:0,
            visible:false,
            updateWord:''
        }
        this.addWords=this.addWords.bind(this);
        this.deleteWord=this.deleteWord.bind(this);
        this.updateWord=this.updateWord.bind(this);
        this.updateWordDetail=this.updateWordDetail.bind(this);
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
    render(){
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
        return(
            <div className="container">
                <div className="row">
                    <Header subTitle="Sentence Edit" />
                </div>
                <div className="row">
                    <Roads
                        roads={config.common_road}
                    />
                </div>
                <Row>
                    <Col span={15}>
                        <Sentence
                            id={this.state.id}
                        />
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
        );
    }
}

export default SentenceEdit;