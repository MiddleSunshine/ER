import React from "react";
import Header from "../component/Header";
import Roads from "../component/Roads";
import config from "../config/setting";
import Sentence from "../component/Sentence";
class SentenceEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:props.match.params.id
        }
    }
    render(){
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
                <div className="row">
                    <Sentence
                        id={this.state.id}
                    />
                </div>
            </div>
        );
    }
}

export default SentenceEdit;