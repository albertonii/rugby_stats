import { useState } from "react";
import { Category } from "../../../types";
import CategoryForm from "./CategoryForm";
import DeleteConfirmation from "../common/DeleteConfirmation";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Senior Masculino",
      description: "Categoría principal masculina",
      ageRange: "18+",
      status: "active",
    },
    {
      id: 2,
      name: "Senior Femenino",
      description: "Categoría principal femenina",
      ageRange: "18+",
      status: "active",
    },
    {
      id: 3,
      name: "Sub-18",
      description: "Categoría juvenil",
      ageRange: "16-18",
      status: "active",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCreateCategory = (categoryData: Partial<Category>) => {
    const newCategory = {
      ...categoryData,
      id: categories.length + 1,
    } as Category;
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (categoryData: Partial<Category>) => {
    setCategories(
      categories.map((category) =>
        category.id === selectedCategory?.id
          ? { ...category, ...categoryData }
          : category
      )
    );
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      setCategories(
        categories.filter((category) => category.id !== selectedCategory.id)
      );
      setIsDeleteOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Volver al inicio
          </Link>
        </div>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsFormOpen(true);
          }}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Nueva Categoría
        </button>
      </div>

      {/* Tabla Responsiva con Scroll */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rango de Edad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {category.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {category.ageRange}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                      {category.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsFormOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4">
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDeleteOpen(true);
                      }}
                      className="text-red-600 hover:text-red-900">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formularios y Confirmación */}
      <CategoryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={selectedCategory ? handleEditCategory : handleCreateCategory}
        initialData={selectedCategory || undefined}
      />

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
        title="Eliminar Categoría"
        message={`¿Estás seguro de que deseas eliminar la categoría ${selectedCategory?.name}?`}
      />
    </div>
  );
};

export default CategoriesList;
