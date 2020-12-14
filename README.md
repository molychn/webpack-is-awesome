# webpack-is-awesome
 webpack理解与实现

## webpack安装
通过npm install安装webpack所需要的node_module依赖包
## webpack简单命令实现打包
设置entry与output，而后通过webpack命令打包
## 解析babel
对于ES6的内容，webpack需要使用相应的配置与文件对其进行解析
- 安装babel库 @babel/core @babel/preset-env
- 安装webpack相应loader babel-loader
## 解析相应的loader
对于各自的解析需要有相应的loader进行解析，如上述解析ES6语法时会用到babel-loader，因此对于react等市面上的前端框架，以及css/less语法的解析都有其相对应的loader
- css/less：style-loader/css-loader/less-loader等
- react：框架的语法解析则需要用到babel的一些配置来实现，如preset-react
- 图片与字体：file-loader/url-loader(url的解析可以对资源较小的一些图片进行base64加密后关联在打包的文件中)
loader的写法在webpack的配置中有多种方式：
- 直接在use字段中引用该loader的名字
- 将多个loader名称打包成一个数组后由use指向该数组
- 在数组中，针对某个loader需要进行单独配置时，可将该loader写成一个key-value对象，由字段loader与options进行配置
## 监听文件
- webpack --watch
- WDS热更新，将监听文件放在内存中而不像watch放置在磁盘中
### 注意事项
使用热更新时需要安装webpack-dev-server，此时需要注意是它与webpack/webpack-cli版本的兼容问题
- WDM，将webpack输出的文件传输给服务器，适用于灵活的定制场景
### 解析过程：
- webpack compile将js编译成bundle
- HMR server将热更新的文件输出到HMR Runtime
- Bundle server提供文件在浏览器的访问，一般对生成一个server站点进行访问
- HMR Runtime被注入到浏览器，起到更新文件变化的作用
- bundle.js构建输出的文件
## 文件指纹
利用文件指纹确认版本区别
- Hash：每次项目文件有修改整个项目构建的hash值都会更改
  - 在file-loader的optioins中修改name值，使用hash
- Chunkhash：和webpack的打包chunk相关，不同的entry会生成 不同的chunk
  - 设置output的filename，使用chunkhash
- Contenthash：根据文件内容来定义hash，文件内容不变则contenthash不变
  - 设置MiniCssExtractPlugin的filename使用contenthash
## 文件压缩
- js：webpack内置的uglifyjs-webpack-plugin
- css：由于css-loader更新后不再兼容压缩，可以使用optimize-css-assets-webpack-plugin，同时使用cssnano进行css压缩
- html：html-webpack-plugin
## 清理旧构建目录
使用clean-webpack-plugin插件在webpack配置中引用实现打包时清理
## 自动添加css前缀
postcss-loader与autoprefix，同样注意两个插件的版本区别
## 移动端实现px转rem
使用px2rem-loader与手淘lib-flexible库实现相应式计算
## 实现资源内联
- 对于css内联的实现，可用style-loader配置其options实现，或者使用html-inline-css-webpack-plugin。
- raw-loader在html文件中引入相应的文件：
```
// 在头文件中引入meta内容
${require('raw-loader!./meta.html)}
// 引入js内容
${require('raw-loader!babel-loader!./something.js)}
```
## source map
对于devtool开发配置选项可进行source map配置
## 公共代码提取
1. 使用SplitChunksPlugin进行公共脚本分离，这一部分主要是webpack自带的插件，可以直接设置optimization配置进行提取设置
2. 另一种就是使用HtmlWebpackExternalsPlugins，在plugins里实例化后会抽取出所配置的依赖库，如React，jQuery等，但是在打包过程中它会在html文件里进行两次注入（后续要了解下才行）
## tree-shaking（可以重点了解下原理）
开启mode配置进行tree-shaking操作
## scope hoisting
将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当地重命名一些变量防止变量名冲突  
在webpack4中当配置参数mode为production时默认开启scope hoisting  
也就是要进行作用域提升时，最好的书写方式是尽量将要引用到的库放置在最前面  
相关插件：ModuleConcatenationPlugin