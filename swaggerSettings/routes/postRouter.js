const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a post
 *     description: Retrieve a specific post by ID
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: Title of the post
 *                 content:
 *                   type: string
 *                   description: Content of the post
 */
router.get("/posts", (req, res) => {});

module.exports = router;