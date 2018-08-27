/*
+------------+------------------+------+-----+-------------------+----------------+
| Field      | Type             | Null | Key | Default           | Extra          |
+------------+------------------+------+-----+-------------------+----------------+
| id         | int(11)          | NO   | PRI | NULL              | auto_increment |
| name       | varchar(20)      | NO   | UNI | NULL              |                |
| age        | int(10) unsigned | NO   |     | NULL              |                |
| married    | tinyint(4)       | NO   |     | NULL              |                |
| comment    | text             | YES  |     | NULL              |                |
| created_at | datetime         | NO   |     | CURRENT_TIMESTAMP |                |
+------------+------------------+------+-----+-------------------+----------------+
*/
module.exports=(sequelize, DataTypes)=>{
    return sequelize.define('user',{
        name:{
            type:DataTypes.STRING(20),
            allowNull:false,
            unique: true,
        },
        age:{
            type: DataTypes.INTEGER,UNSIGNED,
            allowNull: false,
        },
        married:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        },        
    },{
        timestamps:false,
    });
};