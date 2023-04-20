import { Table, Column, Model, HasMany} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import DbProjekt from './DbProjekt.model';

@Table({
    tableName: "messe",
    timestamps: true,
    createdAt: "erstelltam",
    updatedAt: "geaendertam",
})
export default class DbMesse extends Model<DbMesse> {


        @Column({
            type: DataTypes.STRING(5),
            field: "messenummer",
            primaryKey: true
        })
        messenummer!: string;

        @Column({
            type: DataTypes.STRING(30),
            field: "messeort",
        })
        messeort!: string;

        @Column({
            type: DataTypes.DATE,
            field: "messebeginn",
        })
        messebeginn!: Date;

        @Column({
            type: DataTypes.DATE,
            field: "messeende",
        })
        messeende!: Date;

        @HasMany(() => DbProjekt, { foreignKey: "messenummer", sourceKey: "messenummer" })
        projekte!: DbProjekt[];

    }
