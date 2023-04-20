
// import { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { Op } from "sequelize";
import { randomUUID } from "crypto";

import database from "./database";
import DbTask from "./models/DBTask.model";
import DbBucket from "./models/DbBucket.model";
import DbPlanner from "./models/DbPlanner.model";
import DbProjekt from "./models/DbProjekt.model";
import DbMesse from "./models/DbMesse.model";
import DbProjectTask from "./models/DbProjectTask.model";

import init from "./graph";

const PLANNERID = "F8hHmIHAyU61rcKiqoakS5gACTR1";

async function main() {
    // initialize database
    const db = await database();
    // initialize graph
    const ms = await init();
    // start sync
    try {
        while (true) {
            // get projects
            const projects = await DbProjekt.findAll({
                where:{
                    status: ["AN", "AF", "AG", "AU"],
                    kostentrg: {
                        [Op.like]: "03%"
                    },
                    messenummer: {
                        [Op.like]: "3%"
                    }
                },
                include: [{
                    model: DbProjectTask,
                    include: [{
                        model: DbTask,
                    }]
                }]
            })

            // iterate projects
            for (const project of projects) {
                let bucket = await DbBucket.findOne({
                    where: {
                        name: project.status
                    }
                });

                if (!bucket) {
                    // create bucket
                    const newBucket = await ms.api("/planner/buckets").post({
                        name: project.status,
                        planId: PLANNERID,
                        orderHint: ' !'
                    });

                    // save new bucket to db
                    bucket = new DbBucket();
                    bucket.bucketId = newBucket.id ?? "";
                    bucket.name = newBucket.name ?? "";
                    bucket.etag = newBucket["@odata.etag"] ?? "";
                    bucket.bucketGuid = randomUUID();
                    bucket.plannerId = newBucket.planId ?? PLANNERID;
                    await bucket.save();
                }
                
                // check if task exists
                if (project.projectTask) {
                    // check if task needs to be updated
                    if (project.projectTask.task.bucketId !== bucket.bucketId) {
                        // update task
                        let error = undefined;
                        let task = await ms.api(`/planner/tasks/${project.projectTask.task.taskId}`)
                            .header("If-Match", project.projectTask.task.etag)
                            .header("Prefer", "return=representation")
                            .patch({
                                bucketId: bucket.bucketId,
                            }).catch((err) => {
                                error = err;
                                });
                        if (error) {
                            // if etag is outdated, get new etag and try again
                            const etag = (await ms.api(`/planner/tasks/${project.projectTask.task.taskId}`).get())["@odata.etag"];
                            task = await ms.api(`/planner/tasks/${project.projectTask.task.taskId}`)
                                .header("If-Match", etag)
                                .header("Prefer", "return=representation")
                                .patch({
                                    bucketId: bucket.bucketId,
                                });
                            }

                        // save updates to db
                        await project.projectTask.task.update({
                            bucketId: bucket.bucketId,
                            etag: task["@odata.etag"] ?? ""
                        })
                    }
                } else {
                    // create task
                    const task = await ms.api("/planner/tasks").post({
                        planId: PLANNERID,
                        bucketId: bucket.bucketId,
                        title: `${project.messenummer} - ${project.projektnr} - ${project.kostentrg} - ${project.projektbez}`,
                        orderHint: ' !'
                    });

                    // save to db
                    const dbTask = new DbTask();
                    dbTask.taskId = task.id ?? "";
                    dbTask.bucketId = bucket.bucketId;
                    dbTask.name = task.title ?? "";
                    dbTask.etag = task["@odata.etag"] ?? "";
                    dbTask.taskGuid = randomUUID();
                    dbTask.plannerId = task.planId ?? PLANNERID;
                    await dbTask.save();

                    // create project task
                    const dbProjectTask = new DbProjectTask();
                    dbProjectTask.guid = randomUUID();
                    dbProjectTask.taskId = dbTask.taskId;
                    dbProjectTask.projectGuid = project.guid;
                    dbProjectTask.plannerId = dbTask.plannerId;
                    await dbProjectTask.save();

                }
                
                // // get messe
                // const messe = await project.getMesse();

            }
            // sleep 1 seconds
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } catch (error) {
        console.error(error);
        await db.close();
    }
}

main().then(() => {
    console.log("done");
})

// Path: src\index.ts
