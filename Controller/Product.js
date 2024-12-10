import { ProductModel } from "../Model/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const fetchAllProduct = async (req, res) => {
  try {
    // const { category } = req.query;
    let condition = {};

    // If not admin, exclude deleted products
    //   if (!req.query.admin) {
    //     condition.deleted = { $ne: true };
    //   }

    // Initialize query and total count query
    let query = ProductModel.find({deleted: {$ne: true}});
    let totalProductsQuery = ProductModel.find({deleted: {$ne: true}});

    //   Handle category filtering
    if (req.query.category) {
      const categories = req.query.category.split(",");
      query = query.find({ category: { $in: categories } });
      totalProductsQuery = totalProductsQuery.find({
        category: { $in: categories },
      });
    }

    // Handle brand filtering
    if (req.query.brand) {
      const brands = req.query.brand.split(",");
      query = query.find({ brand: { $in: brands } });
      totalProductsQuery = totalProductsQuery.find({ brand: { $in: brands } });
    }

    // Handle sorting
    if (req.query._sort && req.query._order) {
      const sortOrder = req.query._order.toLowerCase() === "desc" ? -1 : 1;
      query = query.sort({ [req.query._sort]: sortOrder });
    }

    // Get total product count for pagination
    const totalDocs = await totalProductsQuery.countDocuments();

    // Handle pagination
    if (req.query._page && req.query._per_page) {
      const pageSize = parseInt(req.query._per_page, 10);
      const page = parseInt(req.query._page, 10);
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Execute query
    const docs = await query.exec();
    // console.log(docs)

    // Set headers and send response
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(400).json({ error: err.message });
  }
};

export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    res.status(201).json(product);
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    console.log(req.body)
    const product = await ProductModel.findByIdAndUpdate(id, req.body, {new:true});
    res.status(201).json(product);
  } catch (err) {
    console.error("Error saving product:", err.message);
    res.status(400).json({ error: err.message });
  }
};
