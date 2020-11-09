# ==壹瞬约拍==
## 前言
#### 调查与发现
- 多数大学生用微博/朋友圈约拍
- 约拍为兼职摄影师主要收入来源之一
- 同类型产品较少
- 大部分同类型App定位模糊
- 缺少合适的摄影师认证门槛
- 成人内容擦边球
#### 一些问题
- 产品定位： 先例较少
- 主打方向： 朋友圈 or 闲鱼 ？ 社交工具 or 类购物平台 ？
- 运作模式： 线上线下情况多且复杂
- 用户群体： 仅大学生 or 允许商业工作室介入
- 约拍方式： 自行搜索 or 智能推荐
- 运营与保障：参考滴滴/Uber等网约平台
#### 一些再创造（理想化）
- 三重门槛：实名认证、在校认证、摄影水平审核
- 社交模块：点赞、关注、私信、转发功能
- 微交易模块：线上支付订金、线下自行协商
- 信息拓展：支持上传个人作品集
- 用户检索：引入风格标签、同城标签
- 模仿豆瓣：可创建小组/发布线上线下活动

## 项目流程
#### 参考文档
- 主程序参考：[腾讯云实战教程](https://github.com/TencentCloudBase/Good-practice-tutorial-recommended/tree/master/YPW%EF%BC%88%E6%82%A6%E6%8B%8D%E5%B1%8B%E5%B0%8F%E7%A8%8B%E5%BA%8F%EF%BC%89) & [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- UI样式库参考：[WeUI文档](https://github.com/Tencent/weui) & [阿里巴巴图标库](https://www.iconfont.cn/)
#### 开发工具
- 原型设计：墨刀
- 程序模板：Github
- UI样式库：WeUI
- UI样式库：ColorUI
- 图标库：阿里图标库
- 开发工具：微信开发者工具
- API文档：小程序官方文档
- 参考教程：Github/B站/CSDN
#### UI设计
![1](https://img-blog.csdnimg.cn/20200205232001549.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)
![2](https://img-blog.csdnimg.cn/20200205232138698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)
#### 后台管理
- 未进行任何优化
![1](https://img-blog.csdnimg.cn/2020020523510489.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)
![2](https://img-blog.csdnimg.cn/20200205235123351.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)

#### 核心技术（引例）
###### 云函数：登录捕获
```javascript
const cloud = require('wx-server-sdk')
// 初始化 cloud
cloud.init()
const db = cloud.database()
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = async(event, context) => {
  let openId = event.userInfo.openId
  const result = await db.collection("userList").where({
    openId: openId
  }).get();
  if (result.data.length > 0) {
    return await db.collection("userList").doc(result.data._id).update({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender
      }
    })
  } else {
    return await db.collection("userList").add({
      data: {
        avatarUrl: event.avatarUrl,
        nickName: event.nickName,
        gender: event.gender,
        openId: openId,
        isAuth: false,
        createTime: new Date()
      }
    })
  }
}
```
###### CSS3：搜索动画
- 本技术借鉴自 [云开发CloudBase大神博客](https://www.jianshu.com/u/64cca9da1a68)
- 思路：在模态框内放置两个view标签

```css
 <view id='preloader'>              //外围的圆形框定义
    <view id='loader'></view>       //内部的线条定义
</view>
```

```css
#preloader {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #97b2ff;
}
#loader {         //中间线条定义
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #97b2ff;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}
#loader:before {          //通过伪类元素定义外围线条
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #97b2ff;
  -webkit-animation: spin 3s linear infinite;
  animation: spin 3s linear infinite;
}
#loader:after {       //通过伪类元素定义最内部线条
  content: "";
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #97b2ff;
  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;
}
```

#### 底层代码（引例）
- userCenter.js（个人中心页面）

```java
// pages/userCenter/userCenter.js
const app = getApp();
var that;
const db = wx.cloud.database();
Page({
  data: {
    isShow: false,
    // 显示加载更多 loading
    hothidden: true,
    userInfo: {},
    // loading
    hidden: true,
    iconList: [{
      icon: 'camerafill',
      color: 'purple',
      badge: 0,
      name: '我的约拍',
      url: '/pages/userCenter/myLaunch/myLaunch'
    }, {
      icon: 'home',
      color: 'blue',
      badge: 0,
      name: '个人主页',
      url: '/pages/userCenter/personal/personal'
    }, {
      icon: 'writefill',
      color: 'yellow',
      badge: 0,
      name: '编辑资料',
      url: '/pages/userCenter/editDetail/editDetail'
    }, {
      icon: 'share',
      color: 'olive',
      badge: 0,
      name: '分享名片',
        url: '/pages/userCenter/shareCard/shareCard'
    }, {
      icon: 'likefill',
      color: 'red',
      badge: 0,
      name: '我的收藏',
      url: '/pages/userCenter/collect/collect'
    }, {
      icon: 'edit',
      color: 'blue',
      badge: 0,
      name: '建议反馈',
      url: '/pages/userCenter/advice/advice'
    }],
    gridCol: 3,
    skin: false
  },
  //......
  })
```
- userCenter.wxss（个人中心页面）

```css
/* pages/userCenter/userCenter.wxss */
 .page__bd{
   padding-bottom: 0;
 }
.weui-media-box__thumb{
 border: 1px solid beige;
  border-radius: 50%;
}
.page {
  /* height: 100Vh;
  width: 100vw; */
}

.page.show {
  overflow: hidden;
}

.switch-sex::after {
  content: "\e716";
}

.switch-sex::before {
  content: "\e7a9";
}

.switch-music::after {
  content: "\e66a";
}

.switch-music::before {
  content: "\e6db";
}
```
## 实机演示（部分截图）
- 核心功能：约拍信息的发布、查看、匹配等等
![1](https://img-blog.csdnimg.cn/20200206003201401.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)
- 社交基本功能
![2](https://img-blog.csdnimg.cn/20200206003232306.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)
- 个人中心管理
![3](https://img-blog.csdnimg.cn/20200206003249530.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NsZWFubGlp,size_16,color_FFFFFF,t_70)

## 项目总结
- 本项目为小程序入门练手用途，代码部分仅供参考；
- 大致思路已经形成，但诸多功能仍未完善，由于后期开发难度较大（画饼太大），目前处于beta搁置阶段；
- 希望这篇文章能给刚入坑的同学一些帮助！如果能给想做校园约拍平台的同行一点新的思路更是再好不过了！

