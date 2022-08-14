import React, {useEffect, useState} from 'react';
import { Descriptions } from 'antd';
function DetailsDrawer({item}) {
    // let item = {...item}
    return (
        <div >
            <Descriptions
                title="基本信息"
                bordered={true}
                column={4}
                labelStyle={{fontWeight:'bold'}}
            >
                <Descriptions.Item label="小区名称" span={2}>
                    {item.name}
                </Descriptions.Item>
                <Descriptions.Item label="本月均价" span={2}>
                    {item.priceNum}/㎡
                </Descriptions.Item>
                <Descriptions.Item label="小区地址" span={4}>
                    {item.position}
                </Descriptions.Item>
                <Descriptions.Item label="房屋总数" span={2}>
                    {item.buildingNum}户
                </Descriptions.Item>
                <Descriptions.Item label="所属区域" span={2}>
                    {item.address === undefined ? "" : item.distinct} {item.comarea}
                </Descriptions.Item>
                <Descriptions.Item label="产权描述" span={4}>
                    {item.ownAgeLimit}
                </Descriptions.Item>

                <Descriptions.Item label="环线位置" span={2}>
                    {item.round}
                </Descriptions.Item>
                <Descriptions.Item label="物业类型" span={2}>
                    {item.projType}
                </Descriptions.Item>
                <Descriptions.Item label="建筑年代" span={2}>
                    {/*{item.ctime}*/}
                    暂无信息
                </Descriptions.Item>
                <Descriptions.Item label="建筑类型" span={2}>
                    {item.buildType}
                </Descriptions.Item>
                <Descriptions.Item label="建筑面积" span={2}>
                    {item.buildingArea}
                </Descriptions.Item>
                <Descriptions.Item label="占地面积" span={2}>
                    {item.stateArea}㎡
                </Descriptions.Item>
                <Descriptions.Item label="楼栋总数" span={2}>
                    {item.buildingNum}栋
                </Descriptions.Item>
                <Descriptions.Item label="绿 化 率" span={2}>
                    {item.virescenceRate}
                </Descriptions.Item>
                <Descriptions.Item label="容 积 率" span={2}>
                    {item.dimension}
                </Descriptions.Item>
                <Descriptions.Item label="物 业 费" span={2}>
                    {item.propertyFee}元/㎡·月
                </Descriptions.Item>
                <Descriptions.Item label="开 发 商" span={4}>
                    {item.developer}
                </Descriptions.Item>
                <Descriptions.Item label="物业公司" span={4}>
                    {item.propertyManager}
                </Descriptions.Item>
            </Descriptions>
            <br/>
            <Descriptions title="配套设施" bordered column={4}>
                <Descriptions.Item label="供     暖" span={2}>
                  暂无信息
                </Descriptions.Item>
                <Descriptions.Item label="停 车 位" span={2}>
                    {item.parkings}
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}

export default DetailsDrawer;
