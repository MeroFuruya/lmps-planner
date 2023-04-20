import { Table, Column, Model, ForeignKey, BelongsTo, HasOne} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import DbMesse from './DbMesse.model';
import DbProjectTask from './DbProjectTask.model';

@Table({
    tableName: "projekt",
    timestamps: true,
    createdAt: "erstelltam",
    updatedAt: "geaendertam",
})
export default class DbProjekt extends Model<DbProjekt> {

        @ForeignKey(() => DbMesse)
        @Column({
            type: DataTypes.STRING(5),
            field: "messenummer"
        })
        messenummer!: string;

        @Column({
            type: DataTypes.STRING(3),
            field: "projektnr",
            primaryKey: true
        })
        projektnr!: string;

        @Column({
            type: DataTypes.STRING(6),
            field: "kostentrg",
        })
        kostentrg!: string;

        @Column({
            type: DataTypes.STRING(60),
            field: "projektbez",
        })
        projektbez!: string;

        @Column({
            type: DataTypes.STRING(2),
            field: "status",
        })
        status!: string;

        @Column({
            type: DataTypes.STRING(38),
            field: "xguid",
        })
        guid!: string;

        @BelongsTo(() => DbProjectTask, { foreignKey: "guid", targetKey: "projectGuid" })
        projectTask!: DbProjectTask;

        public async getMesse(): Promise<DbMesse | null> {
            return await DbMesse.findByPk(this.messenummer);
        }

    }
