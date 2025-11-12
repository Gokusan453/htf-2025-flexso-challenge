import * as cds from "@sap/cds";
import type { Request } from "@sap/cds";
import * as handlerSymbol from "./handlers/symbols";
import * as handlerMaterial from "./handlers/materials";
import * as handlerCamera from "./handlers/camera";

export = (srv: cds.Service) => {
  srv.on("UPDATE", "Symbols", () => {});

  srv.after("READ", "Symbols", (data: any[]) => {
    return data;
  });

  srv.after("READ", "SymbolTranslations", (data: any[]) => {
    console.log(data);
    return data;
  });

  srv.on("translateSymbolBound", "Symbols", (req: Request) => {
    return handlerSymbol.translate(req);
  });

  srv.on("order", "Materials", (req: Request) => {
    return handlerMaterial.order(req);
  });

  srv.on("produce", "ProductCamera", (req: Request) => {
    return handlerMaterial.produce(req);
  });

  srv.on("replace", "Installation", (req: Request) => {
    return handlerMaterial.replaceInstallation(req);
  });

  srv.before("READ", "CameraImages", (req: Request) => handlerCamera.checkCameraAvailability(req));

  srv.on("checkCameraAvailability", async (req: Request) => {
    return handlerCamera.areAllCamerasAvailable(req);
  });

  srv.on("getCamerarecordingIdForLocation", async (req: Request) => {
    return handlerCamera.getCamerarecordingIdForLocation(req);
  });

};
