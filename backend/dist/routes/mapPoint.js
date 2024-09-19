"use strict";
// routes/mapPoint.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mapPoint_1 = require("../controllers/mapPoint");
const router = (0, express_1.Router)();
router.get('/', mapPoint_1.getMapPoints);
router.get('/:id', mapPoint_1.getMapPoint);
router.post('/', mapPoint_1.postMapPoint);
router.put('/:id', mapPoint_1.updateMapPoint);
router.delete('/:id', mapPoint_1.deleteMapPoint);
exports.default = router;
