import OracleDB from "oracledb";
import { Sequelize } from "sequelize-typescript";

import DbProjectTask from "./models/DbProjectTask.model";
import DbPlanner from "./models/DbPlanner.model";
import DbBucket from "./models/DbBucket.model";
import DbTask from "./models/DBTask.model";
import DbProjekt from "./models/DbProjekt.model";
import DbMesse from "./models/DbMesse.model";


OracleDB.outFormat = OracleDB.OUT_FORMAT_OBJECT;
OracleDB.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_9' });

const USERNAME = process.env.ORACLEDB_USER || "system";
const PASSWORD = process.env.ORACLEDB_PASSWORD || "oracle";
const CONNECTIONSTRING = process.env.ORACLEDB_CONNECTIONSTRING || "localhost:1521/orcl";


async function connect(): Promise<Sequelize> {
    const database = new Sequelize({
        dialect: "oracle",
        quoteIdentifiers: false,
        username: USERNAME,
        password: PASSWORD,
        logging: false, // console.log,
        dialectOptions: {
            connectString: CONNECTIONSTRING,
        },
        sync: { force: false, alter: false },
        models: [DbProjectTask, DbPlanner, DbBucket, DbTask, DbProjekt, DbMesse]
    });

    await database.authenticate().then(() => {
        console.log("Connection to Database has been established successfully.");
    }).catch(err => {
        console.error("Unable to connect to the database:", err);
    });

    // console.log(await database.query('SELECT "id", "x1geaendertusrguid" AS "changedUserGuid", "x1erstelltusrguid" AS "createdUserGuid", "tpp_bezeichnung" AS "name", "tpp_planerguid" AS "plannerGuid", "tpp_etag" AS "etag", "tpp_planerid" AS "plannerId", "x1erstelltam", "x1geaendertam" FROM "tp_planer";'))


    return database;
}

export default connect;
