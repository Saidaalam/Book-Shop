"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderControllers_1 = require("../controllers/orderControllers");
const router = express_1.default.Router();
router.post("/", orderControllers_1.createOrder);
router.get("/", orderControllers_1.getOrders);
router.get("/:id", orderControllers_1.getOrderById);
router.put("/:id", orderControllers_1.updateOrderStatus);
router.delete("/:id", orderControllers_1.deleteOrder);
exports.default = router;
