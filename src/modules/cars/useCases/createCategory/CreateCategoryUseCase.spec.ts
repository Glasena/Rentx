import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a category", async () => {

        const category = {
            name: "Category Test", description: "Category Description Test"
        }

        await createCategoryUseCase.execute({ name: category.name, description: category.description });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    })

    it("Should not be able to create a new category with name exists", async () => {

        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        await expect(createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })).rejects.toEqual({message: "Category already exists", statusCode: 400});

    });

});