/**
 * @description 文件工具类
 * @author yq
 * @date 2017/4/24 下午6:14
 */
const fs = require('fs');
const path = require('path');

class FileUtil {
  /**
   * 同步获取文件夹下所有文件全路径
   * @param filePath
   * @param filePaths
   */
  static getAllFilePathSync(filePath, filePaths = []) {
    fs.readdirSync(filePath).forEach((fileName) => {
      // filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
      const fullFilePath = path.join(filePath, fileName);
      if (fs.statSync(fullFilePath).isDirectory()) {
        return FileUtil.getAllFilePathSync(fullFilePath, filePaths);
      }
      filePaths.push(fullFilePath);
      return null;
    });
  }
}

module.exports = FileUtil;
