import { Table, Column, Model, HasMany, ForeignKey} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import DbTask from './DBTask.model';
import DbPlanner from './DbPlanner.model';

@Table({
    tableName: "tp_bucket",
    timestamps: true,
    createdAt: "x1erstelltam",
    updatedAt: "x1geaendertam",
})
export default class DbBucket extends Model<DbBucket> {

    @Column({
        type: DataTypes.STRING(38),
        field: "x1geaendertusrguid",
        defaultValue: "",
        allowNull: true
    })
    changedUserGuid: string = "";

    @Column({
        type: DataTypes.STRING(38),
        field: "x1erstelltusrguid",
        defaultValue: "",
        allowNull: true
    })
    createdUserGuid: string = "";

    @Column({
        type: DataTypes.STRING(120),
        field: "tpp_etag",
        allowNull: true
    })
    etag!: string;

    @Column({
        type: DataTypes.STRING(60),
        field: "tpp_lmpsinfo",
        allowNull: true
    })
    lmpsInfo: string = "";

    @Column({
        type: DataTypes.STRING(120),
        field: "tpp_bucketbez",
        allowNull: true
    })
    name!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_bucketguid",
        primaryKey: true,
        allowNull: true
    })
    bucketGuid!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_buecketid",  // <-- typo in the database
        allowNull: true
    })
    bucketId!: string;

    @ForeignKey(() => DbPlanner)
    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_planerid",
        allowNull: true
    })
    plannerId!: string;

    @HasMany(() => DbTask, { foreignKey: "bucketId", sourceKey: "bucketId" })
    tasks!: DbTask[];

}
