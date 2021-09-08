import React from 'react'
import PhoneticSymbol from "../component/phoneticSymbol";

class Index extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <a href="./web">网页版入口</a>
                </div>
                <div>
                    <PhoneticSymbol />
                </div>
            </div>
        )
    }
}

export default Index
