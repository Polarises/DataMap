import React, {useEffect, useState} from 'react';
import {Drawer, Pagination, Table} from "antd";
import axios from "axios";
import DetailsDrawer from "./component/DetailsDrawer";

function IndexTable(props) {
    const [ listData, setListData ] = useState([])
    // const [ data, setData ] = useState([])
    const [ visible, setVisible] = useState(false);
    const [ detailsInfo, setDetailsInfo] = useState('');
    const [pageNum,setPageNum] = useState('4218')
    const {searchValue,selectTotalValue,selectManageValue,searchChangeValue,selectAreaComarea} = props

    //初始页数
    useEffect(() => {
        sendRequest(1, 10);
    },[])
    // console.log(selectTotalValue)

    useEffect(() => {
        let arr = selectManageValue?.label.split('-');
        let propertyHoldsStr = arr?.toString()
        let arr1 = selectTotalValue?.label.split('-');
        let householdsStr = arr1?.toString()
      axios.get('/state/list',{
          params:{
              nameLike:searchChangeValue,
              propertyHoldsStr:propertyHoldsStr,
              householdsStr:householdsStr,
              comarea:selectAreaComarea
          }
      }).then((res) => {
         setListData(res.data.data.list)
      })
    },[searchChangeValue,selectManageValue,selectTotalValue,selectAreaComarea])


    useEffect(() => {
        setPageNum(listData?.length)
    },[listData])


    //搜索具体
    useEffect(() => {
        if (searchValue !== undefined){
            axios.get(`/state/detail/${searchValue.id}`).then((res)=>{
                let a = [res.data.data]
                setListData(a)
            })
        }
    },[searchValue])



    //分页以及渲染首页
    function sendRequest(page= undefined, size = undefined,) {
        return axios.get(`/state/list`,{
            params: {
                page: page,
                size: size,
            }
        }).then(res =>{
            // setData(res.data.data.list)
            // console.log(res.data.data.list)
            setListData(res.data.data.list)
        })
    }


    const columns = [
        {
            title: '编号',
            // render:(text,record,index)=>`${index+1}`,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '小区名称',
            dataIndex: 'fullName',
            key: 'fullName',

        },
        {
            title: '房屋总数',
            dataIndex: 'households',
            key: 'households',
            sorter: {
                compare: (a, b) => a.households - b.households,
            },
        },
        {
            title: '所在区域',
            key: 'address',
            dataIndex: 'address',
            // dataIndex:'comarea',
            render: (text) =>{
                return (<span>{text.distinct || ''}</span>)
            }
        },
        {
            title: '所在商圈',
            key: 'comarea',
            // dataIndex: 'address',
            dataIndex:'comarea',
            // render: (text) =>{
            //     return (<span>{text.distinct || ''}</span>)
            // }
        },
        {
            title: '物业公司',
            dataIndex: 'propertyManager',
            key: 'propertyManager',
        },
        {
            title: '管理小区',
            dataIndex: 'propertyHolds',
            key: 'propertyHolds',
            sorter: {
                compare: (a, b) => a.stateArea - b.stateArea,
            },
        },
        {
            title: '开发商',
            dataIndex: 'developer',
            key: 'developer',
        },
        {
            title: '操作',
            render: (item) => {
                return <span onClick={()=> {handleDetailsInfo(item)}} style={{color:'#0F6DFF',fontSize:'14px',cursor:'pointer'}}>查看</span>
            }
        },
    ];

    const handlePage = (pageNumber) => {
        sendRequest(pageNumber, 20);
    }


    const onClose = () => {
        setVisible(false);
    };

    //点击详情
    const handleDetailsInfo = (item) => {
        setVisible(true);
        setDetailsInfo(item)
        console.log(detailsInfo)
    }
    // console.log(listData.length)
    return (
        <div>
            <Table
                columns={columns}
                dataSource={listData}
                pagination={false}
                rowKey={item=>item.id}
            />
            <Pagination
                showQuickJumper
                defaultCurrent={1}
                total={pageNum}
                // 设置每页几条数据
                // pageSize={listData.length}
                onChange={handlePage}
            />
            <Drawer
                title={detailsInfo.name}
                placement="right"
                onClose={onClose}
                visible={visible}
                width={600}>
                <DetailsDrawer item={detailsInfo}/>
            </Drawer>

        </div>
    );
}

export default IndexTable;

/*    useEffect(()=>{
        console.log(searchChangeValue)
        if (searchChangeValue !== ''){
            setListData(data.filter((item)=>{
                return JSON.stringify(item).includes(searchChangeValue)
            }))
        }else {
            setListData(
                data
            )
        }
    },[searchChangeValue])*/

// console.log(listData.length)

// useEffect(()=>{
//     if (selectTotalValue !==undefined){
//         // console.log(selectTotalValue)
//         let arr = selectTotalValue.label.split('-');
//         let minTotalVal = arr[0]
//         let maxTotalVal = arr[1]
//         setListData(
//             data.filter((item) => {
//                 return item.households < maxTotalVal && item.households > minTotalVal
//             })
//         )
//
//     }else {
//         setListData(data)
//     }
// },[selectTotalValue])
//搜索
// function serachChange(searchChangeValue) {
//     if (searchChangeValue !== undefined){
//         console.log(searchChangeValue)
//         axios.get('/state/list',{
//             params:{
//                 nameLike:searchChangeValue
//             }
//         }).then((res)=>{
//             setTest1(res.data.data.list)
//             // setListData(res.data.data.list)
//         })
//     }
//
// }
// //管理小区
// function ManageChange(selectManageValue) {
//     if (selectManageValue !== undefined){
//         let arr = selectManageValue?.label.split('-');
//         let propertyHoldsStr = arr?.toString()
//         axios.get(`/state/list`,{
//             params:{
//                 propertyHoldsStr:propertyHoldsStr
//             }
//         }).then((res)=>{
//             setTest2(res.data.data.list)
//         })
//     }
// }
