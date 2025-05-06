"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from "../../api/api"
import { categoryOptions } from '../../data/data';
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


function Products({ language = "fr" }) {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);
  const [productImg, setProductImg] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  // Filter products
  const filteredProducts = products.filter((product) => {

    const normalizeString = (str) =>
      str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const matchesSearch =
      product.name &&
      product.name[language] &&
      normalizeString(product.name[language].toLowerCase()).includes(
        normalizeString(searchQuery.toLowerCase())
      );
    const matchesCategory =
      filterCategory === "all" || (product.categoryId && product.categoryId?.key === filterCategory);
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts()
        setProducts(res.data)
      } catch (error) {
        console.error("Erreur de chargement des produits :", error)
      }
    }

    loadProducts()
  }, [])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategories();
        console.log("Categories:", res.data);
        setCategories(res.data);
      } catch (error) {
        console.error("Erreur de chargement des catégories :", error);
      }
    };

    loadCategories();
  }, []);

  // Handle edit product
  const handleEditProduct = (product) => {
    console.log("Editing Product:", product); // Debug the product being edited
    setSelectedProduct({
      id: product._id,
      name: product.name || { fr: "", en: "" },
      description: product.description || { fr: "", en: "" },
      price: product.price || { mad: "", usd: "" },
      categoryId: product.categoryId?._id || "", // Set categoryId correctly
      images: product.images || [],
      isNewArrival: product.isNewArrival || false,
      isBestSeller: product.isBestSeller || false,
    });
    setIsModalOpen(true);
  };

  // Handle add new product
  const handleAddProduct = () => {
    setSelectedProduct({
      name: { fr: "", en: "" },
      description: { fr: "", en: "" },
      price: { mad: "", usd: "" },
      category: "",
      images: [],
      sNewArrival: false,
      isBestSeller: false,
    });
    setIsModalOpen(true);
  };

  // Handle delete product
  const handleDeleteProduct = (product) => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete product
  const confirmDeleteProduct = async () => {
    if (!selectedProduct?._id) return;

    try {
      await deleteProduct(selectedProduct._id);
      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));
      toast.success("Produit supprimé");
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      toast.error("Erreur lors de la suppression");
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  }


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Serialize fields before appending
      formData.append("name", JSON.stringify(selectedProduct.name));
      formData.append("description", JSON.stringify(selectedProduct.description));
      formData.append("price", JSON.stringify(selectedProduct.price));
      formData.append("categoryId", selectedProduct.categoryId); // Use categoryId from the dropdown
      formData.append("isNewArrival", selectedProduct.isNewArrival || false);
      formData.append("isBestSeller", selectedProduct.isBestSeller || false);

      // Append existing images
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        formData.append("existingImages", JSON.stringify(selectedProduct.images));
      }

      // Append new images
      if (productImg) {
        Array.from(productImg).forEach((file) => {
          formData.append("images", file);
        });
      }

      // Debug FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send request to backend
      if (selectedProduct.id) {
        const updated = await updateProduct(selectedProduct.id, formData);
        setProducts((prev) =>
          prev.map((p) => (p._id === updated._id ? updated : p))
        );
        toast.success("Produit mis à jour");
      } else {
        const created = await createProduct(formData);
        setProducts((prev) => [...prev, created]);
        toast.success("Produit ajouté");
      }

      setIsModalOpen(false);
      setSelectedProduct(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la sauvegarde");
    }
  };


  return (
    <div className="flex min-h-screen">

      <div className="flex-1 w-full p-2 sm:p-2 md:p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#B9703E]">Products</h1>
          <button
            onClick={handleAddProduct}
            className="bg-[#B9703E] text-white px-3 py-1 rounded-md hover:bg-[#8A9A5B] transition-colors duration-300"
          >
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="bg-[#F0E4CF] rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Nom du produit ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B9703E]"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B9703E]"
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.key}>{cat[language]}</option>
                ))}

              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F0E4CF] text-left">
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Badge</th>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-8 h-8 rounded-md overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name[language]}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{product.categoryId?.[language]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.price.mad} MAD</td>
                    <td className="px-6 py-4 whitespace-nowrap text-start">
                      <span
                        className={`text-xs rounded-full ${product.isBestSeller ? "px-2 py-1 bg-green-100 text-green-800 mr-2" : "bg-transparent m-0 p-0"
                          }`}
                      >
                        {product.isBestSeller ? "BEST" : ""}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${product.isNewArrival ? "bg-orange-100 text-red-800" : "bg-transparent"
                          }`}
                      >
                        {product.isNewArrival ? "NEW" : ""}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-gray-700 hover:text-black"
                        >
                          <FaRegEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="text-red-400 hover:text-red-700"
                        >
                          <FaRegTrashCan size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F0E4CF] rounded-lg w-full max-w-3xl p-6 m-8 sm:m-8 lg:m-auto max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#B9703E]">
                {selectedProduct.id ? "Modifier le produit" : "Ajouter un produit"}
              </h2>
              <button className="text-gray-600 hover:text-[#B9703E]" onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex flex-col  border-b-2 sm:border-b-2 md:border-none  border-gray-100 pb-8 sm:pb-8 md:pb-0 pr-0 sm:pr-0 md:pr-4">
                <p className="text-center text-gray-500"> Français </p>
                <div>
                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Nom</label>
                    <input
                      type="text"
                      placeholder="Nom"
                      value={selectedProduct.name.fr || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          name: { ...prev.name, fr: e.target.value },
                        }))
                      }
                      className="p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Prix</label>
                    <input
                      type="number"
                      placeholder="Prix"
                      value={selectedProduct.price.mad || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          price: { ...prev.price, mad: e.target.value },
                        }))
                      }
                      className="p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Catégorie</label>
                    <select
                      value={selectedProduct.categoryId || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          categoryId: e.target.value, // Update categoryId when a new category is selected
                        }))
                      }
                      className="p-2 border rounded"
                      required
                    >
                      <option value="">Choisir une catégorie</option>
                      {categories.slice(1).map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat[language]} {/* Display category name in the selected language */}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Description</label>
                    <textarea
                      placeholder="Description"
                      value={selectedProduct.description.fr || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          description: { ...prev.description, fr: e.target.value },
                        }))
                      }
                      className="p-2 border rounded col-span-1 md:col-span-2"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Images</label>
                    {selectedProduct.images && selectedProduct.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedProduct.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Product ${index}`}
                            className="w-20 h-20 object-cover rounded-full"
                          />
                        ))}
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => setProductImg(e.target.files)}
                      className="p-2 border rounded"
                    />
                  </div>

                </div>
              </div>

              <div>
                <p className="text-center text-gray-500"> English </p>
                <div>
                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={selectedProduct.name.en || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          name: { ...prev.name, en: e.target.value },
                        }))
                      }
                      className="p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-md font-semibold mb-1">Price</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={selectedProduct.price.usd || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          price: { ...prev.price, usd: e.target.value },
                        }))
                      }
                      className="p-2 border rounded"
                      required
                    />
                  </div>

                  <div className="flex flex-col mb-4">
                    <label className="text-md font-semibold mb-1">Description</label>
                    <textarea
                      placeholder="Description"
                      value={selectedProduct.description.en || ""}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          description: { ...prev.description, en: e.target.value },
                        }))
                      }
                      className="p-2 border rounded col-span-1 md:col-span-2"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isNewArrival"
                      checked={selectedProduct.isNewArrival || false}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          isNewArrival: e.target.checked,
                        }))
                      }
                      className="mr-2 accent-[#B9703E]"
                    />
                    <label htmlFor="isNewArrival" className="text-md font-semibold">
                      New Arrival
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      checked={selectedProduct.isBestSeller || false}
                      onChange={(e) =>
                        setSelectedProduct((prev) => ({
                          ...prev,
                          isBestSeller: e.target.checked,
                        }))
                      }
                      className="mr-2 accent-[#B9703E]"
                    />
                    <label htmlFor="isBestSeller" className="text-md font-semibold">
                      Best Seller
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#B9703E] text-white py-2 px-4 rounded col-span-1 md:col-span-2"
              >
                {selectedProduct.id ? "Modifier" : "Ajouter"}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete <strong>{selectedProduct.name[language]}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
