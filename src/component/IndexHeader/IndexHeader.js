import React, {useEffect, useRef, useState} from 'react';
import './IndexHeader.less'
import {AutoComplete, Input} from 'antd';
import axios from "axios";
import HeaderSelect from "./component/HeaderSelect/HeaderSelect";

function IndexHeader(props) {
    const [options,setOptions] = useState();
    const [loading, setLoading] = useState(false);
    const originValue = useRef();
    useEffect(() => {
        setLoading(true);
        axios.get(`/state/map/some`).then(res =>{
            originValue.current = res.data.data.map((item) => {
                return {
                    value:item.name,
                    id:item.id,
                }
            })
        }).finally(() => {
            setLoading(false);
        });
    },[])
    const onSelect = (selectVal,event) => {
        props.getSearchValue(event)
    };

    let timeout
    const handleSearch = (keyword) => {
        if (timeout) clearTimeout(timeout)
         timeout = setTimeout(() => {
            props.getSearchChangeValue(keyword)
            setOptions(!keyword ? [] : originValue.current.filter(item => JSON.stringify(item).includes(keyword)))
        }, 800)
        // setOptions(!keyword ? setOptions(originValue.current) : originValue.current.filter(item => JSON.stringify(item).includes(keyword)))
    }
    const handleChange = ()=>{
        console.log()
    }

    return (
        <div className='HeaderBox'>
            <div className='HeaderSearch'>
                <AutoComplete
                    disabled={loading}
                    defaultOpen={true}
                    style={{ maxHeight: 400 }}
                    options={options}
                    onSearch={handleSearch}
                    onSelect={onSelect}
                    // placeholder="搜索物业、小区、地点"
                    allowClear={true}
                    autoFocus={true}
                    backfill={true}
                    // onChange={handleChange}
                >
                    <Input.Search size="large" placeholder="搜索物业、小区、地点" enterButton="搜索" onSearch={handleSearch}/>
                </AutoComplete>


            </div>
            <div className='HeaderSelect'>
                <HeaderSelect />
            </div>
        </div>
    );
}

export default IndexHeader;

