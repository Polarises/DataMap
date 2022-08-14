import React, {useContext, useEffect, useRef, useState} from 'react';
import './HeaderSelect.less';
import axios from "axios";
import {DownOutlined} from "@ant-design/icons";
import {Space, Popover, Select} from "antd";
import RESET from '../../../../images/DEL.png'
import RESETClicked from '../../../../images/DELClicked.png'
import {selectContext} from "../../../../view";
import {log} from "@craco/craco/lib/logger";
const { Option } = Select;

function HeaderSelect(props) {
    const [data,setData] = useState([])
    const [clickItem,setClickItem] = useState({})
    const [titleName,setTitleName] = useState('所在区域')
    const [roomTot,setRoomTot] = useState('房屋总数')
    const [roomMan,setroomMan] = useState('管理小区')

    const {setSelectTotalValue,setSelectManageValue,setSelectArea,setSelectAreaComarea} = useContext(selectContext)

    useEffect(() => {
        axios.get('/area.json').then(res =>{
            setData(res.data[0].list[0].list)
            // console.log(data)
        })

    },[])


    const handleSelectTotle = (Option)=>{
        setSelectTotalValue(Option)
        setRoomTot(Option.label)
    }

    const handleSelectManage = (Option) =>{
        setSelectManageValue(Option)
        setroomMan(Option.label)

    }

    const handleImgClick = () => {
        setSelectTotalValue()
        setSelectManageValue()
        setSelectAreaComarea()
        setTitleName('所在区域')
        setRoomTot('房屋总数')
        setroomMan('管理小区')
    }


    const itemClick = (item) =>{
        console.log(item.target.innerText)
        setSelectAreaComarea(item.target.innerText)
        setTitleName(item.target.innerText)
    }
    function titleClick(item) {
        setClickItem(item)
        setSelectArea(item)

    }

    const content = (
        <div className='SelectBox'>
            <div className='SelectBoxLeft'>
                {data.map((item,index)=>{
                    return <span
                        key={index}
                        onClick={()=>{titleClick(item)}}>{item.name}
                    </span>
                })}
            </div>
            <div className='SelectBoxMain'>
                <h2>{clickItem.name}</h2>
                <div>
                    {
                        clickItem.list?.map((item,index) => {
                            return <span key={index} onClick={(item)=>{
                                itemClick(item)
                            }}>{item.name}</span>
                        })
                    }
                </div>
            </div>
        </div>
    );
    return (

        <div className='HeaderCascade'>
            <div className='placeArea'>
                <Popover   trigger="click"
                           content={content}
                           overlayStyle={{width:'702px',height:'300px'}}
                >
                    <span style={{marginRight:'10px'}}> {titleName}</span>
                    <Space/>
                    <Space/>
                    <Space/>
                    <DownOutlined/>
                </Popover>
            </div>
            <div style={{margin:'0 30px'}} >
                <Select
                    labelInValue
                    bordered={false}
                    onSelect={handleSelectTotle}
                    style={{
                        width: 100,
                    }}
                    // placeholder={roomTot}
                    value={roomTot}
                >
                    <Option value="1"> 0-1000</Option>
                    <Option value="2">1000-2000</Option>
                    <Option value="3">2000-3000</Option>
                    <Option value="4">3000-4000</Option>
                    <Option value="5">4000-5000</Option>
                    <Option value="6">5000-6000</Option>
                </Select>
            </div>
            <div>
                <Select
                    labelInValue

                    onSelect={handleSelectManage}
                    bordered={false}
                    onClear={() => {
                        console.log(1)
                    }}
                    style={{
                        width: 100,
                    }}
                    // placeholder={roomMan}
                    value={roomMan}
                >
                    <Option value="1">0-5</Option>
                    <Option value="2">5-10</Option>
                    <Option value="3">10-20</Option>
                    <Option value="4">20以上</Option>
                </Select>
            </div>
            <div className='imgArea' onClick={handleImgClick}  >
                重置
            </div>
        </div>
    );

}



export default HeaderSelect;
