# 服务端说明
## 环境要求

    `mysql` 版本为(5.6 ~ )
    
    `redis` 版本为(3 ~ )
    
    `node` 版本为(6.0 ~ )
    
    `phython` 版本为(2.5 < version < 3.0)
    
    `pomelo` 版本为2.2.5 
    
## 如何查看API文档
两种方式：

1. 执行yarn run doc生成文档页面，生成的文档在docs目录中，直接用浏览器打开里面的index.html即可，该方式只能看到公开API的文档；
2. 查看doc/apiDoc中的注释，该方式可以看到所有文档，包括内部实现逻辑文档；

## 准备工作
### 1、安装mysql
详见(https://www.mysql.com/downloads/)
### 2、安装node
详见（https://nodejs.org/en/）
### 3、安装pomelo(需要安装依赖的环境，详见 https://github.com/NetEase/pomelo/wiki/Installation)
```bash
yarn add pomelo -g
```
### 4、新建数据库
mysql数据库执行 api-server/doc/game_db.sql

## 启动项目
### 1、安装依赖
```bash
yarn install
```
### 2、修复pomelo socket.io警告
```bash
yarn run fix
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
