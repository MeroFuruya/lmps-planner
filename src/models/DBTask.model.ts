import { Table, Column, Model, HasOne, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import DbProjectTask from './DbProjectTask.model';
import DbBucket from './DbBucket.model';

@Table({
    tableName: "tp_task",
    timestamps: true,
    createdAt: "x1erstelltam",
    updatedAt: "x1geaendertam",
})
export default class DbTask extends Model<DbTask> {

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
        type: DataTypes.STRING(120),
        field: "tpp_taskbez"
    })
    name!: string;

    @Column({
        type: DataTypes.STRING(120),
        field: "tpp_etag"
    })
    etag!: string;

    @ForeignKey(() => DbBucket)
    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_buecketid"
    })
    bucketId!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_taksguid",
        primaryKey: true
    })
    taskGuid!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_taskid"
    })
    taskId!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_planerid"
    })
    plannerId!: string;

    @HasOne(() => DbProjectTask, { foreignKey: 'taskId', sourceKey: 'taskId' })
    projectTask!: DbProjectTask;
}
