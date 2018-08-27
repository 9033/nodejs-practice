/*
+------------+--------------+------+-----+-------------------+----------------+
| Field      | Type         | Null | Key | Default           | Extra          |
+------------+--------------+------+-----+-------------------+----------------+
| id         | int(11)      | NO   | PRI | NULL              | auto_increment |
| commenter  | int(11)      | NO   | MUL | NULL              |                |
| comment    | varchar(100) | NO   |     | NULL              |                |
| created_at | datetime     | YES  |     | CURRENT_TIMESTAMP |                |
+------------+--------------+------+-----+-------------------+----------------+
*/
module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('comment',{
        comment:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },    
    },{
        timestamps:false,
    });
}