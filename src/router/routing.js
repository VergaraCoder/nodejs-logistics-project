const { Router } = require("express");
const {
  addData,
  readData,
  createOtherEndpoints,
  returnDataFind,
  writeData,
  returnIndexFind,
  verifyWerehouse,
} = require("../functions/functions");
const { verifyParams } = require("../middlewares/error");

const router = Router();

router.post("/warehouses", async (req, res) => {
  try {
    const data = await addData("warehouses", req.body);
    res.status(201).json({
      message: "Warehouse created successfully",
      warehouse: data,
    });
  } catch (err) {
    res.status(401).json({
      message: "Warehouse creation failed",
    });
  }
});

router.get("/warehouses", async (req, res) => {
  try {
    const data = await readData();
    res.status(201).json({ warehouse: data["warehouses"] });
  } catch (err) {
    res.status(400).json({ message: "courrio un error" });
  }
});

router.get("/warehouses/:id", async (req, res) => {
  try {
    const data = await readData();
    const dataWarehouse = data.warehouses.find((item) => {
      return item.id == parseInt(req.params.id);
    });

    if (!dataWarehouse) throw new Error("THE WAREHOUSE NOT EXIST");
    else {
      dataWarehouse.links = createOtherEndpoints(
        "warehouses",
        parseInt(req.params.id)
      );
      res.status(200).json({
        warehouse: dataWarehouse,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.put("/warehouses/:id", async (req, res) => {
  try {
    const idRegister = parseInt(req.params.id);
    const data = await readData();

    const index = returnIndexFind(data.warehouses, idRegister);

    data.warehouses[index] = { id: idRegister, ...req.body };

    await writeData(data);

    res.status(200).json({
      message: "actualizado con exito",
    });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
});

router.delete("/warehouses/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = readData();
    const indexRegister = returnIndexFind(data.warehouses, id);
    data.warehouses.splice(indexRegister, 1);
    await writeData(data);
    res.status(200).json({ message: "DELETED" });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.post("/shipments", async (req, res) => {
  try {
    await verifyWerehouse(req.body);
    await addData("shipments", req.body);
    res.status(200).json({ message: "add correctly" });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

router.get("/shipments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await readData();

    const index = returnIndexFind(data.shipments, id);

    const linkEnpoints = createOtherEndpoints("shipments", req.params.id);

    data.shipments[index].links = { ...linkEnpoints };

    res.status(200).json({ shipments: data.shipments[index] });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

router.put("/shipments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await readData();
    const index = returnIndexFind(data.shipments, id);
    data.shipments[index] = { id: id, ...req.body };
    await writeData(data);
    res.status(200).json({ message: "ALL PERFECT" });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

router.delete("/shipments/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await readData();
    const index = returnIndexFind(data.shipments, id);
    console.log(index);
    console.log(id);
    console.log(data.shipments);
    data.shipments.splice(index, 1);
    await writeData(data);
    res.status(200).json({ message: "PERFECT DELETED" });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

router.post("/drivers", async (req, res) => {
  try {
    await addData("drivers", req.body);
    res.status(200).json({ message: "ADD CORRECTLY" });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

router.get("/drivers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await readData();
    const index = returnIndexFind(data.drivers, id);
    res.status(200).json({ drivers: data.drivers[index] });
  } catch (err) {
    if (err.code) res.status(err.code).json({ message: err.message });
    else res.json({ message: err.message });
  }
});

module.exports = { router };
