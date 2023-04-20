import { Table, Column, Model, HasMany, Sequelize} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import DbBucket from './DbBucket.model';

@Table({
    tableName: "tp_planer",
    // freezeTableName: true,
    // modelName: "tp_planer",
    timestamps: true,
    createdAt: "x1erstelltam",
    updatedAt: "x1geaendertam",
})
export default class DbPlanner extends Model<DbPlanner> {

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
        field: "tpp_bezeichnung"
    })
    name!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_planerguid",
        primaryKey: true
    })
    plannerGuid!: string;

    @Column({
        type: DataTypes.STRING(120),
        field: "tpp_etag"
    })
    etag!: string;

    @Column({
        type: DataTypes.STRING(38),
        field: "tpp_planerid"
    })
    plannerId!: string;

    @HasMany(() => DbBucket, { foreignKey: "plannerId", sourceKey: "plannerId" })
    buckets!: DbBucket[];
}
