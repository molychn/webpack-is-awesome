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
## 代码分割与动态加载
使用require.ensure；使用新特性与babel配合使用实现动态加载（@babel/plugin-syntax-dynamic-import）
## 在webpack中集成eslint规范团队代码开发
## webpack ssr打包
使用webpack打包后利用服务器进行渲染的方式，需配置好webpack适配服务器端，同时在服务器端渲染时要注意的是，服务器端是没有浏览器的window对象的。  
首先是写法问题，要在服务器端渲染，则引入的库与文件需使用require的写法引入，  
之后的webpack配置中，先对eslint-loader进行屏蔽，输出格式也设置为**libraryTarget: 'umd'**的格式，  
还有一点的是，对于图片的打包，由于file-loader打包后本身默认的EsModule模块与服务器端渲染是有区别的，所以需要对file-loader也做一个相应的修改，即esModule: false  
除了图片的打包配置，样式的加载也会受其影响，因此可以使用客户端打包的html文件作模版，实现样式的渲染，主要实现方式就是采用占位符，然后用String.replace方法来进行替换。相同，在服务端请求数据时也可以使用占位符将请求到的数据挂载到window对象上。
## 优化终端构建日志
- 可以使用插件friendly-errors-webpack-plugin
- 设置stats参数实现终端日志产出
## compiler hooks钩子捕获操作
compiler.hooks.done.tap('done', (stats) => {})
## 构建包设计
- 通过配置多个文件管理不同环境的webpack配置文件
- 抽离成一个npm包进行统一管理
- 使用eslint规范包代码
### 功能设计
- 基础配置
  - 负责开发与生产的资源解析，即两环境下共有的module模块配置
  - 样式增强，对css进行前缀补齐（postcss-loader）以及单位上的转换（px2rem-loader，这点看项目实际需要操作）
  - 目录清理，每次使用webpack运行环境时，无论是开发还是生产发布，都可以对目录缓存进行清理
  - 多页面打包
  - 终端日志优化以及错误的捕获与处理
  - css提取成一个单独文件
- 开发阶段配置
  - 代码热更新
  - sourcemap
- 生产阶段配置
  - 代码压缩
  - 文件指纹
  - tree shaking
  - 速度与体积优化
- SSR配置
  - output设置
  - 样式解析忽略css-ignore