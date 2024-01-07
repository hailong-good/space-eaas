exports.keys = 'xuhailong';

// exports.sequelize = {
//     dialect: 'mysql', // 表示使用mysql数据库
//     host: '127.0.0.1', // 连接的数据库主机地址
//     port: 3306,        // 数据库端口号
//     database: 'space-eaas', // 数据库名
//     username: 'root', // 数据库用户名
//     password: 'xu2297040028', // 数据库密码
//     timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
//     define: {  // model的全局配置
//       timestamps: false,   // 添加create,update,delete时间戳
//       freezeTableName: false,  // 防止修改表名为复数
//       underscored: false  // 防止驼峰式字段被默认转为下划线
//     },
//     app: true,
//     dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
//       dateStrings: true,
//       typeCast(field, next) {
//         if(field.type === "DATETIME"){
//           return field.string();
//         }
//         return next();
//       }
//     }
//   }

exports.mysql = {
  client: {
    host: "124.221.219.179", // 连接的数据库主机地址
    port: 3306, // 数据库端口号
    user: "root", // 数据库用户名
    password: "xu2297040028", // 数据库密码
    database: "space-eaas", // 数据库名
  },
  app: true,
  agent: false,
};
