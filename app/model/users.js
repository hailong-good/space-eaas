module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Users = app.model.define('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER
      },
      name: {
        allowNull: false,
        type: INTEGER,
        comment: '部门deptId'
      },
    });
    Users.associate = function() {
      Users.belongsTo(app.model.Departments, {
        foreignKey: 'deptId'
      });
      Users.belongsToMany(app.model.Roles, { through: 'user_roles', foreignKey: 'userId', as: 'roles'});
    };
    return Users;
  };