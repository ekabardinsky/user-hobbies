import app from "./app";
import { Request, Response } from "express";
import { getFailure } from "./util/ResponseWrapper";

// global exception handler
app.use(function (err: any, req: Request, res: Response, next: any) {
    // logic
    if (err) {
        res.status(500);
        res.render(JSON.stringify(getFailure(500, err)));
    } else {
        next();
    }
});

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
