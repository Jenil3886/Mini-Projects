import express from "express";
import Item from "../models/Item.js";

import { Op } from "sequelize";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// create a new item
router.post("/" , authenticate, async(req , res) =>{
    try {
        const { name, description, category, price } = req.body;
        if (!name || !description || !category || !price) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const item = await Item.create({ name, description, category, price });
        return res.status(201).json({ message: "Item created successfully", item });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });   
    }
})

// get all items
router.get("/" , async(req, res) => {
    try {
        const { q, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
        const where = {};
        if (q) {
            // where.name = { [Op.like]: `%${q}%` };
              where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } }
      ];
        }
        if (category) {
            where.category = category;
        }
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) {
                where.price[Op.gte] = parseFloat(minPrice);
            }
            if (maxPrice) {
                where.price[Op.lte] = parseFloat(maxPrice);
            }
        } 
        const order = [];
           if (sort === "price_asc") order.push(["price", "ASC"]);
           else if (sort === "price_desc") order.push(["price", "DESC"]);
           else order.push(["createdAt", "DESC"]);

        const offset = (page - 1) * limit;

        const findOutAllItems = {
            where,
            order,
            offset,
            limit: parseInt(limit, 10)
        }


        return  res.status(200).json({
            data: await Item.findAll(findOutAllItems),
            total: await Item.count({ where }),
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        })
        //  res.json({ total: count, page: Number(page), limit: Number(limit), items: rows });

        // const items = await Item.findAll();
        // return res.status(200).json({ data: items });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

// get item by id
router.get("/:id" , async(req,res) =>{
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        return res.status(200).json({ data: item });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
        
    }
})

// update item by id
router.put("/:id" , authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price } = req.body;
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        const updatedItem = await item.update({ name, description, category, price });
        return res.status(200).json({ message: "Item updated successfully", item: updatedItem });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})

// delete item by id
router.delete("/:id" , authenticate, async(req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByPk(id);
        if (!item) {                    
            return res.status(404).json({ message: "Item not found" });
        }
        await item.destroy();
        return res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})  

export default router;