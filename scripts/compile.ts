import * as fs from "fs";
import process from "process";
import { Cell } from "ton-core";
import { compileFunc } from "@ton-community/func-js";

async function compileScript() {

    console.log("=======================================================================");

    console.log("Compile script is running");
 
    const compileResult = await compileFunc({
        targets: ["./contracts/main.fc"],
        sources: (x) => fs.readFileSync(x).toString("utf-8")
    });

    const hexArtifact = `build/main.compiled.json`;

    if (compileResult.status === "error"){
        console.log("Compilation error");
        console.log(`\n${compileResult.message}`);
        process.exit(1);
    }

    console.log("-Compilation success");

    fs.writeFileSync(
        hexArtifact,
        JSON.stringify({
            hex: Cell.fromBoc(Buffer.from(compileResult.codeBoc, "base64"))[0]
            .toBoc()
            .toString("hex")
        })
    );

    console.log(" - Compiled code save to" + hexArtifact);
}

compileScript()