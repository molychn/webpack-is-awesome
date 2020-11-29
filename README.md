# webpack-is-awesome
 webpack理解与实现

# webpack安装
通过npm install安装webpack所需要的node_module依赖包
# webpack简单命令实现打包
设置entry与output，而后通过webpack命令打包
# 解析babel
对于ES6的内容，webpack需要使用相应的配置与文件对其进行解析
- 安装babel库 @babel/core @babel/preset-env
- 安装webpack相应loader babel-loader
# 解析相应的loader
对于各自的解析需要有相应的loader进行解析，如上述解析ES6语法时会用到babel-loader，因此对于react等市面上的前端框架，以及css/less语法的解析都有其相对应的loader
- css/less：style-loader/css-loader/less-loader等
- react：框架的语法解析则需要用到babel的一些配置来实现，如preset-react
- 图片与字体：file-loader/url-loader(url的解析可以对资源较小的一些图片进行base64加密后关联在打包的文件中)
loader的写法在webpack的配置中有多种方式：
- 直接在use字段中引用该loader的名字
- 将多个loader名称打包成一个数组后由use指向该数组
- 在数组中，针对某个loader需要进行单独配置时，可将该loader写成一个key-value对象，由字段loader与options进行配置