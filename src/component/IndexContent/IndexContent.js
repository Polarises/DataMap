import React, {useEffect, useState} from 'react';
import './IndexContent.less'
import IndexMap from "./IndexMap/IndexMap";
import {Badge, Descriptions} from "antd";
import axios from "axios";
function IndexContent(props) {
    const [coordinate,setCoordinate] = useState([])
    useEffect(() => {
        axios.get('/state/map/some').then((res)=>{
            let temp = []
            res.data.data.map((item)=>{
                temp.push(item.address.coordinate)
            })
            setCoordinate(temp)
        })
    },[])
    useEffect(()=>{
        mapItem()
    }, [])
    function mapItem() {
        //创建map对象，初始化地图
        // eslint-disable-next-line
        let map = new window.TMap.Map('container', {
            // eslint-disable-next-line
            center: new window.TMap.LatLng(34.824508,113.647804), //设置地图中心点坐标
            // center: new window.TMap.LatLng(39.984120,116.307484),
            zoom:15,   //设置地图缩放 级别
            viewMode:'2D'
        });
            for (let i = 0; i < 20; i++){
                // console.log(coordinate[i][0])
                let markerCluster = new window.TMap.MarkerCluster({
                    id: i, //图层id
                    map: map,       //设置点聚合显示在哪个map对象中
                    enableDefaultStyle: true,   //使用默认样式
                    minimumClusterSize: 2,  //最小聚合点数：2个
                    geometries: [
                        // "position": new window.TMap.LatLng(data2[i].latitude,data2[i].longitude),
                        {position: new window.TMap.LatLng(coordinate[i][1],coordinate[i][0])},

                        // {position: new window.TMap.LatLng(34.824508,113.647804)},
                        // //....将您所有要打到图中的坐标点传入进来
                    ],
                    zoomOnClick: true,  //点击聚合数字放大展开
                    gridSize: 10,       //聚合算法的可聚合距离，即距离小于该值的点会聚合至一起，默认为60，以像素为单位
                    averageCenter: false, //每个聚和簇的中心是否应该是聚类中所有标记的平均值
                    maxZoom: 16 //采用聚合策略的最大缩放级别，若地图缩放级别大于该值，则不进行聚合，标点将全部被展开
                });
            }

            // markerCluster.on("click", function (evt) {
            //     // setMapInfo(evt)
            // })
    }


    return (
        <div className='ContentBox'>
            <div className='MapBox'>
                <div id="container" style={{height:"100%"}}>
                </div>
            </div>
            <div className='MapInfoBox' >
                <IndexMap/>
            </div>
        </div>
    );
}

export default IndexContent;
