import { Router } from "express";
import multer from "multer";

//import createCategoryController from "../modules/cars/useCases/createCategory";
import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController"
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const categoriesRoutes = Router();

const upload = multer({
    dest: "./tmp"
});

const createCateogoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCateogoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated, ensureAdmin, importCategoryController.handle)

export { categoriesRoutes };