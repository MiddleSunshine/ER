import React from "react";
import config from "../config/setting";
import Word from "./Word";

class WordModel extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            word:props.word ?? '',
            id:props.id ?? 0
        }
        this.getWordId=this.getWordId.bind(this);
        this.getWordId();
    }

    getWordId(){
        fetch(
            config.back_domain+"/index.php?action=Words&method=GetID",
            {
                method:"post",
                mode:"cors",
                body:JSON.stringify({
                    word:this.state.word
                })
            }
        ).then((res)=>{
            res.json().then(
                (json)=>{
                    this.setState({
                        id:json.Data.ID
                    })
                }
            ).catch((error)=>{
                console.error(error)
            });
        }).then(()=>{
            this.render();
        })
    }
    render() {
        return(
                <Word id={this.state.id} />
        );
    }
}

export default WordModel;