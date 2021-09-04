import React from 'react'
import config from '../config/setting';

class WordsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.getWordsList();
    }
    getWordsList() {
        fetch(config.back_domain + "/index.php?action=words&method=list")
            .then(

            ).catch((err) => {

            })
    }
    render() {
        return (
            <div>
                <h1>hello world</h1>
            </div>
        );
    }
}

export default WordsList;
