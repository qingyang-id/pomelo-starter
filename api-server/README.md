# 网站RESTful API服务

## 如何查看API文档
两种方式：

1. 执行yarn run doc生成文档页面，生成的文档在docs目录中，直接用浏览器打开里面的index.html即可，该方式只能看到公开API的文档；
2. 查看代码中的注释，该方式可以看到所有文档，包括内部实现逻辑文档；

## 启动项目
### 1、安装依赖
```bash
yarn install
```
### 2、修复pomelo socket.io警告
```bash
yarn run move
```
### 3、启动项目
```bash
yarn run start
```

## 项目常用命令
以下所有命令都必须在项目目录下执行
- 启动服务
```bash
yarn run start
```
- 代码检查
```bash
yarn run lint
```
- 生成API文档
```bash
yarn run doc
```
- 运行测试
```bash
yarn test
```
