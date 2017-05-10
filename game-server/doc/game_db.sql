--
-- Create Database: `game_db`
--
CREATE DATABASE IF NOT EXISTS `game_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `game_db`;

-- --------------------------------------------------------

--
-- 版本2.0 账号管理表的结构 `t_user`
--

CREATE TABLE IF NOT EXISTS `t_users` (
 `id`                 varchar(24)   NOT  NULL COMMENT '用户id',
 `username`           varchar(50)   NOT  NULL COMMENT '用户名',
 `nick`           varchar(50)   DEFAULT  NULL COMMENT '昵称',
 `avatar`           varchar(255)   DEFAULT  NULL COMMENT '头像',
 `phone`           varchar(11)   DEFAULT  NULL COMMENT '手机',
 `password`           varchar(64)   NOT  NULL  COMMENT '用户密码',
 `salt`               varchar(32)   NOT  NULL  COMMENT '加密盐',
 `token`              varchar(50)   DEFAULT NULL COMMENT '用户token',
 `state`              tinyint(1)    NOT  NULL DEFAULT  0 COMMENT '登录状态: 0未登录，1已登录',
 `user_sig`           varchar(512)  DEFAULT NULL COMMENT 'sig',
 `login_time`         DATETIME(3)      DEFAULT  NULL  COMMENT '登录时间',
 `logout_time`        DATETIME(3)       DEFAULT  NULL  COMMENT '退出时间',
 `last_request_time`  DATETIME(3)      DEFAULT  NULL  COMMENT '最新请求时间',
 `update_time`      DATETIME(3)       NOT  NULL COMMENT '更新时间',
 `create_time`      DATETIME(3)       NOT  NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE INDEX (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='直播记录表';

-- --------------------------------------------------------
