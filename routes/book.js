const router = require('express').Router();
const bookController = require('./../controllers/book');

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Books API Endpoints
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get a list of books
 *     description: Retrieve a list of books with their details, including author information.
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the book.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   name:
 *                     type: string
 *                     description: The name of the book.
 *                     example: "un autre book"
 *                   description:
 *                     type: string
 *                     description: A brief description of the book.
 *                     example: "un book avec un auteur"
 *                   author:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier for the author.
 *                         example: "6704ebd29dae53d040668ed0"
 *                       firstname:
 *                         type: string
 *                         description: The author's first name.
 *                         example: "toto"
 *                       lastname:
 *                         type: string
 *                         description: The author's last name.
 *                         example: "fistname"
 *                       email:
 *                         type: string
 *                         description: The author's email address.
 *                         example: "email@email.com"
 *                       password:
 *                         type: string
 *                         description: The author's hashed password.
 *                         example: "$2b$10$exgEJKT058GIKUOdGsQgJOx/9cd69NgaaSoJdSMR2Qzl7zymD3hSi"
 *                       __v:
 *                         type: integer
 *                         description: The version key for the author document.
 *                         example: 0
 *       500:
 *         description: Internal server error
 */
router.get('/', bookController.findAll);

router.get('/:id', bookController.findBook);

/**
 * @swagger
 * /api/book:
 *   post:
 *     summary: Create a new book
 *     description: Create a new book with its details, including author reference.
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - author
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book.
 *                 example: "un autre book"
 *               description:
 *                 type: string
 *                 description: A brief description of the book.
 *                 example: "un book avec un auteur"
 *               author:
 *                 type: string
 *                 description: The ID of the author for the book.
 *                 example: "6704ebd29dae53d040668ed0"
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the created book.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 name:
 *                   type: string
 *                   description: The name of the book.
 *                   example: "un autre book"
 *                 description:
 *                   type: string
 *                   description: A brief description of the book.
 *                   example: "un book avec un auteur"
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the author.
 *                       example: "6704ebd29dae53d040668ed0"
 *                     firstname:
 *                       type: string
 *                       description: The author's first name.
 *                       example: "toto"
 *                     lastname:
 *                       type: string
 *                       description: The author's last name.
 *                       example: "fistname"
 *       400:
 *         description: Bad request - Invalid input or missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/', bookController.create);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;
