import { Table, Column, Model, BelongsTo, HasOne} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import DbTask from './DBTask.model';
import DbProject from './DbProjekt.model';

@Table({
    tableName: "tp_prjtask",
    timestamps: true,
    createdAt: "x1erstelltam",
    updatedAt: "x1geaendertam",
})
export default class DbProjectTask extends Model<DbProjectTask> {
    
        @Column({
            type: DataTypes.STRING(38),
            field: "x1geaendertusrguid",
            defaultValue: ""
        })
        changedUserGuid!: string;
    
        @Column({
            type: DataTypes.STRING(38),
            field: "x1erstelltusrguid",
            defaultValue: ""
        })
        createdUserGuid!: string;
    
        @Column({
            type: DataTypes.STRING(38),
            field: "tp_prjtaskguid",
            primaryKey: true
        })
        guid!: string;
    
        @Column({
            type: DataTypes.STRING(38),
            field: "prjguid"
        })
        projectGuid!: string;
    
        @Column({
            type: DataTypes.STRING(120),
            field: "tpp_taskid"
        })
        taskId!: string;
    
        @Column({
            type: DataTypes.STRING(38),
            field: "tpp_planerid"
        })
        plannerId!: string;

        @BelongsTo(() => DbTask, { foreignKey: 'taskId', targetKey: 'taskId' })
        task!: DbTask;

        @HasOne(() => DbProject, { foreignKey: 'guid', sourceKey: 'projectGuid' })
        project!: DbProject;

    }