

#### react-native-diary

------

#####一款基于react-native仿照的卡片日记App，提供丰富的功能，更好体验，旨在更好的日记管理。

```
基于React Native开发，适配iOS。

项目的目的是为方便记录每天生活所需。

项目同时适合react native的练手学习，覆盖了各种框架的使用，与原生的交互等。

随着项目的使用情况和反馈，将时不时根据更新并完善用户体验与功能优化吗，欢迎提出问题。
```

------

##### 编译运行流程

1、配置好react native开发环境，可参阅 [【搭建环境】](http://reactnative.cn/docs/0.51/getting-started.html) | [【React Native开发（一、入门）】](http://www.jianshu.com/p/97692b1c451d)

2、clone代码，根目录下执行`npm install`安装node_modules(太慢建议科学上网或使用淘宝镜像)

3、打开xcode运行或执行`react-native run-android`

4、如提示账号错误，更改`General->Bundle Identifier`为其他id(随便写一个即可)



##### 示例图片

![image](NoNet/src/screenshot/screenshot1.gif)



##### 第三方框架

- [react-native@0.51.0](https://reactnative.cn/docs/0.51/getting-started.html)
- [immutability@1.0.2](https://github.com/facebook/immutable-js)

* [redux-immutable@4.0.0](https://github.com/gajus/redux-immutable)
* [prop-types@15.6.0](https://github.com/facebook/prop-types)
* [react-native-swiper@1.5.13](https://github.com/leecade/react-native-swiper)
* [react-native-asset-library-to-base64@1.1.0](https://github.com/wootwoot1234/react-native-asset-library-to-base64)
* [react-native-storage@0.2.2](https://github.com/sunnylqm/react-native-storage)
* [realm@2.2.6](https://realm.io/)
* [react-navigation@^1.0.0-beta.22](https://github.com/react-navigation/react-navigation)
* [shimo-navigation@0.0.26](https://github.com/shimohq/shimo-navigation)
* [redux@3.7.2](https://github.com/reactjs/redux)
* [react-redux@5.0.6](https://github.com/reactjs/react-redux)
* [redux-saga@0.16.0](https://github.com/redux-saga/redux-saga)
* [redux-thunk@2.2.0](https://github.com/gaearon/redux-thunk)
* 其他细节库省略



##### 主要功能

```
在这里实现了主要功能，但像是设置页面中的大部分功能(除分享)外都没有添加，后期有时间会陆续加上。
```

* 添加日记
* 选择图片
* 首页展示及动画
* 删除/修改日记
* 分享



##### 常见问题 

- 1、xcode的运行，第一次下载 react native 和 realm 相关包比较耗时。
- 2、npm安装失败，建议删除node_modules或清除缓存后重试。



##### 总结

react-native上手不难，恶心点在于你需要了解iOS和Android，否则在原声交互上会很费事，其次是需要把react-native全家桶都学一遍，这样开发才会感觉流畅。

建议可以看看黑马的5天react-native商城界面搭建教程，然后一步步来。



##### License

MIT License.