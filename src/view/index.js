import React, {useContext, useEffect, useState} from 'react';
import {Dropdown, Layout, Space} from 'antd';
import './index.less'
import IndexTable from "../component/IndexTable/IndexTable";
import IndexHeader from '../component/IndexHeader/IndexHeader'
import IndexContent from '../component/IndexContent/IndexContent'
const { Header } = Layout;
export const selectContext = React.createContext('')
function Index(props) {
    const [searchValue,setSearchValue] = useState()
    const [searchChangeValue,setSearchChangeValue] = useState()
    const [selectTotalValue,setSelectTotalValue] = useState()
    const [selectManageValue,setSelectManageValue] = useState()
    const [selectArea,setSelectArea] = useState()
    const [selectAreaComarea,setSelectAreaComarea] = useState()
    const getSearchValue = (value) => {
        setSearchValue(value)
        // console.log(value)
    }

    const getSearchChangeValue = (value) => {
        setSearchChangeValue(value)
        // console.log(searchChangeValue)
    }

    return (
        <div className='IndexContent'>
            <Layout className='LayoutContent'>
                <selectContext.Provider value={{setSelectTotalValue,setSelectManageValue,setSelectArea,setSelectAreaComarea}}>
                    <Header className='Headers'>
                        <IndexHeader getSearchValue={getSearchValue} getSearchChangeValue={getSearchChangeValue}/>
                    </Header>
                </selectContext.Provider>
                {/*地图功能*/}
                {/*<div className='IndexContent'>*/}
                {/*    <IndexContent/>*/}
                {/*</div>*/}
                <div style={{padding:30}}>
                    <IndexTable searchValue={searchValue} selectTotalValue={selectTotalValue} selectManageValue={selectManageValue} searchChangeValue={searchChangeValue} selectAreaComarea={selectAreaComarea} selectArea={selectArea}/>
                </div>
            </Layout>
        </div>
    );
}

export default Index;
