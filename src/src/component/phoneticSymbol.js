import React from "react";
import config from "../config/setting";
import "../css/symbolKeybord.css"
import {Button} from "antd";
import {FormOutlined,AudioOutlined} from "@ant-design/icons";

// https://www.hujiang.com/c/wx/p1288247/
var symbolMap={
    yuanyin:{
        danyuanyin:{
            changyuanyin:[
                {
                    id:1,
                    img:'[ɪ]',
                    media:'i-sound.mp3'
                },
                {
                    id:2,
                    img:'[e]',
                    media:'e-sound.mp3'
                },
                {
                    id:3,
                    img:'[ʌ]',
                    media:'^-sound.mp3'
                },
                {
                    id:4,
                    img:'[ə]',
                    media:'e^-sound.mp3'
                },
                {
                    id:5,
                    img:'[ɒ]',
                    media:'o-sound.mp3'
                },
                {
                    id:6,
                    img:'[ʊ]',
                    media:'u-sound.mp3'
                },
                {
                    id:7,
                    img:'[æ]',
                    media:'an-sound.mp3'
                }
            ],
            duanyuanyin:[
                {
                    id:8,
                    img:'[iː]',
                    media:'i-sound2.mp3'
                },
                {
                    id:9,
                    img:'[ɜː]',
                    media:'er-sound.mp3'
                },
                {
                    id:10,
                    img:'[ɔː]',
                    media:'o-sound2.mp3'
                },
                {
                    id:11,
                    img:'[uː]',
                    media:'u-sound2.mp3'
                },
                {
                    id:12,
                    img:'[ɑː]',
                    media:'a-sound2.mp3'
                }
            ]
        },
        shuangyuanyin:[
            {
                id:13,
                img:'[eɪ]',
                media:'ei.mp3'
            },
            {
                id:14,
                img:'[aɪ]',
                media:'ai.mp3'
            },
            {
                id:15,
                img:'[ɔɪ]',
                media:'oi.mp3'
            },
            {
                id:16,
                img:'[aʊ]',
                media:'ao.mp3'
            },
            {
                id:17,
                img:'[əʊ]',
                media:'eu.mp3'
            },
            {
                id:18,
                img:'[ɪə]',
                media:'ir.mp3'
            },
            {
                id:19,
                img:'[eə]',
                media:'er.mp3'
            },
            {
                id:20,
                img:'[ʊə]',
                media:'uer.mp3'
            },
        ]
    },
    fuyin:{
        qingfuyin:[
            {
                id:21,
                img:'[p]',
                media:'p.mp3'
            },
            {
                id:22,
                img:'[t]',
                media:'t.mp3'
            },
            {
                id:23,
                img:'[k]',
                media:'k.mp3'
            },
            {
                id:24,
                img:'[f]',
                media:'f.mp3'
            },
            {
                id:25,
                img:'[θ]',
                media:'si.mp3'
            },
            {
                id:26,
                img:'[s]',
                media:'s.mp3'
            },
            {
                id:27,
                img:'[ts]',
                media:'ts.mp3'
            },
            {
                id:28,
                img:'[tr]',
                media:'tr.mp3'
            },
            {
                id:29,
                img:'[∫]',
                media:'ss.mp3'
            },
            {
                id:30,
                img:'[t∫]',
                media:'tss.mp3'
            }
        ],
        zhuofuyin:[
            {
                id:31,
                img:'[b]',
                media:'b.mp3'
            },
            {
                id:32,
                img:'[d]',
                media:'d.mp3'
            },
            {
                id:30,
                img:'[g]',
                media:'g.mp3'
            },
            {
                id:33,
                img:'[v]',
                media:'v.mp3'
            },
            {
                id:34,
                img:'[ð]',
                media:'qq.mp3'
            },
            {
                id:35,
                img:'[z]',
                media:'z.mp3'
            },
            {
                id:36,
                img:'[dz]',
                media:'dz.mp3'
            },
            {
                id:37,
                img:'[dr]',
                media:'dr.mp3'
            },
            {
                id:38,
                img:'[ʒ]',
                media:'n3.mp3'
            },
            {
                id:39,
                img:'[dʒ]',
                media:'d3.mp3'
            }
        ],
        qitafuyin:[
            {
                id:40,
                img:'[m]',
                media:'m.mp3'
            },
            {
                id:41,
                img:'[n]',
                media:'n.mp3'
            },
            {
                id:42,
                img:'[ŋ]',
                media:'ng.mp3'
            },
            {
                id:43,
                img:'[h]',
                media:'h.mp3'
            },
            {
                id:44,
                img:'[l]',
                media:'l.mp3'
            },
            {
                id:45,
                img:'[r]',
                media:'r.mp3'
            },
            {
                id:46,
                img:'[j]',
                media:'j.mp3'
            },
            {
                id:47,
                img:'[w]',
                media:'w.mp3'
            }
        ]
    }
};

class PhoneticSymbol extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            media:'',
            symbols:[]
        }
        this.playMp3=this.playMp3.bind(this);
        this.updateWords=this.updateWords.bind(this);
        this.saveWords=this.saveWords.bind(this);
    }
    playMp3(source,img){
        console.log(source);
        let symbol=img.slice(1,-1);
        let symbols=this.state.symbols;
        symbols.push(symbol);
        this.setState({
            media:config.front_domain+"/media/"+source,
            symbols: symbols
        });
    }
    updateWords(index){
        let newSymbols=this.state.symbols.filter((current,i)=>{
            return i!==index;
        });
        this.setState({
            symbols:newSymbols
        })
    }
    saveWords(){
        let symbols=this.state.symbols.join(",");
        sessionStorage.setItem("symbols",symbols);
    }
    render() {
        return(
            <div className={"table-responsive"}>
                <div>
                    <Button
                        style={{marginRight:"10px"}}
                        type={"primary"}
                        icon={<FormOutlined />}
                        onClick={()=>this.saveWords()}
                    >
                        Save
                    </Button>
                    <Button
                        icon={<AudioOutlined />}
                        type={"primary"}
                        style={{marginRight:"10px"}}
                    >
                    </Button>
                    <span>/</span>
                    {this.state.symbols.map((item,index)=>{
                        return <span onClick={()=>this.updateWords(index)}>{item}</span>;
                    })}
                    <span>/</span>
                </div>
                <div>
                    <table className={"table table-hover table-condensed symbol-keybord"}>
                        <tr>
                            <td className={"symbol"} rowSpan={3}>元音</td>
                            <td className={"symbol"} rowSpan={2}>单元音</td>
                            <td className={"symbol"}>长元音</td>
                            <td>
                                {symbolMap.yuanyin.danyuanyin.changyuanyin.map((item)=>{
                                    return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>短元英</td>
                            <td>
                                {
                                    symbolMap.yuanyin.danyuanyin.duanyuanyin.map((item)=>{
                                        return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                    })
                                }
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>双元音</td>
                            <td colSpan={2}>
                                {symbolMap.yuanyin.shuangyuanyin.map((item)=>{
                                    return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"} rowSpan={2}>
                                辅音
                            </td>
                            <td className={"symbol"}>
                                清辅音
                            </td>
                            <td colSpan={2}>
                                {symbolMap.fuyin.qitafuyin.map((item)=>{
                                    return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>
                                浊辅音
                            </td>
                            <td colSpan={2}>
                                {symbolMap.fuyin.zhuofuyin.map((item)=>{
                                    return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td className={"symbol"}>
                                其他辅音
                            </td>
                            <td colSpan={3}>
                                {symbolMap.fuyin.qitafuyin.map((item)=>{
                                    return <span onClick={()=>this.playMp3(item.media,item.img)} key={item.id}>{item.img}</span>
                                })}
                            </td>
                        </tr>
                    </table>
                </div>
                <audio style={{display:"none"}} controls={"controls"} src={this.state.media} autoplay={"autoplay"}>
                </audio>
            </div>
        )
    }
}

export default PhoneticSymbol;
