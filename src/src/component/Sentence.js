import React from 'react';
import config from "../config/setting";
import { Form, Input, Button } from 'antd';
import {SaveOutlined,EditOutlined} from '@ant-design/icons'
const marked=require("marked");

class Sentence extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.id,
            sentence:{},
            editNote:false
        }
        this.getSentenceDetail=this.getSentenceDetail.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
        this.updateMarkdownHtml=this.updateMarkdownHtml.bind(this);
    }
    getSentenceDetail(id){
        fetch(
            config.back_domain+"/index.php?action=sentence&method=detail&id="+id
        ).then((res)=>{
            res.json().then((json)=>{
                this.setState({
                    sentence:json.Data
                })
            })
        }).catch((error)=>{
            console.error(error);
        })
    }
    componentDidMount() {
        this.getSentenceDetail(this.state.id);
    }
    handleValueChange(event,type){

    }
    updateMarkdownHtml(){
        if (!this.state.editNote){
            if(this.state.sentence.note && this.state.sentence.note.length){
                document.getElementById("note").innerHTML=marked(this.state.sentence.note);
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMarkdownHtml();
    }
    render() {
        var notePart=<div></div>;
        if (this.state.editNote){
            notePart=<div>
                <textarea
                    className="markdown-textarea"
                    value={this.state.word.note}
                    onChange={(event)=>this.handleValueChange(event,'note')}
                />
            </div>;
        }else{
            notePart=<div className="markdown-preview">
                <div id="note"></div>
            </div>;
        }
        return(
            <div className="container">
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
                                onChange={(e)=>this.handleValueChange(e,'sentence')}
                            />
                        </Form.Item>
                        <Form.Item label="Source">
                            <Input
                                placeholder="Source"
                                value={this.state.sentence.source}
                                onChange={(e)=>this.handleValueChange(e,'source')}
                            />
                        </Form.Item>
                        <Form.Item label="Note">
                            <Button
                                icon={<EditOutlined />}
                                type="primary"
                                onclick={()=>{
                                    this.setState({
                                        editNote:!this.state.editNote
                                    })
                                }}
                            >
                                {this.state.editNote?'Finish':'Edit'}
                            </Button>
                            {notePart}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Sentence;