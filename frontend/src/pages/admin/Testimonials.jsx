"use client"

import { useState } from "react"
import AdminSidebar from "../../components/admin/AdminSidebar"
import { toast } from "react-toastify"
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

// Mock data for testimonials
const initialTestimonials = [
  {
    id: 1,
    name: "Sophie Martin",
    location: "Paris, France",
    rating: 5,
    content:
      "The pottery pieces I ordered are absolutely stunning! The craftsmanship is exceptional, and they've become the focal point of my living room. I'll definitely be ordering more in the future.",
    date: "2023-05-10",
    isApproved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Ahmed Benali",
    location: "Casablanca, Morocco",
    rating: 5,
    content:
      "I purchased a set of mugs as a gift for my wife, and she absolutely loves them. The quality is outstanding, and the designs are unique. Highly recommend!",
    date: "2023-05-08",
    isApproved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emma Johnson",
    location: "London, UK",
    rating: 4,
    content:
      "Beautiful pottery with excellent attention to detail. Shipping was a bit slow, but the quality of the products made up for it.",
    date: "2023-05-05",
    isApproved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    location: "Barcelona, Spain",
    rating: 5,
    content:
      "The custom vase I ordered exceeded my expectations. The colors and design are exactly what I wanted. Will definitely order again!",
    date: "2023-05-03",
    isApproved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Leila Mansouri",
    location: "Marrakech, Morocco",
    rating: 3,
    content:
      "The products are beautiful, but one item arrived with a small chip. Customer service was responsive and offered a replacement.",
    date: "2023-04-28",
    isApproved: false,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "John Smith",
    location: "New York, USA",
    rating: 5,
    content:
      "Absolutely love the wall decoration I purchased. It's a true piece of art and has transformed my dining room.",
    date: "2023-04-25",
    isApproved: true,
    image: "/placeholder.svg?height=100&width=100",
  },
]

function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filterStatus === "all") return true
    if (filterStatus === "approved") return testimonial.isApproved
    if (filterStatus === "pending") return !testimonial.isApproved
    return true
  })

  // Handle edit testimonial
  const handleEditTestimonial = (testimonial) => {
    setSelectedTestimonial({ ...testimonial })
    setIsModalOpen(true)
  }

  // Handle delete testimonial
  const handleDeleteTestimonial = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete testimonial
  const confirmDeleteTestimonial = () => {
    setTestimonials(testimonials.filter((t) => t.id !== selectedTestimonial.id))
    setIsDeleteModalOpen(false)
    toast.success("Testimonial deleted successfully")
  }

  // Toggle approval status
  const toggleApprovalStatus = (id) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === id ? { ...testimonial, isApproved: !testimonial.isApproved } : testimonial,
      ),
    )
    toast.success("Testimonial status updated")
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSelectedTestimonial({
      ...selectedTestimonial,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === selectedTestimonial.id ? selectedTestimonial : testimonial,
      ),
    )
    setIsModalOpen(false)
    toast.success("Testimonial updated successfully")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 w-full p-2 sm:p-2 md:p-4 lg:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-[#B9703E]">Testimonials</h1>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 text-sm font-medium rounded-md focus:ring-1 focus:ring-[#B9703E]"
            >
              <option value="all">All Testimonials</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
            </select>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-[#F0E4CF]/70 rounded-lg shadow-sm p-6 flex flex-col justify-between ${!testimonial.isApproved ? "border-l-4 border-yellow-400" : "border-l-4 border-[#8A9A5B]"}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 border border-white bg-[#8A9A5B] ${i < testimonial.rating ? "text-yellow-400" : "text-white"}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{testimonial.content}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{testimonial.date}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleApprovalStatus(testimonial.id)}
                    className={`px-2 py-1 rounded-md ${testimonial.isApproved ? "bg-[#8A9A5B] text-white" : "bg-yellow-200 text-red-700"}`}
                  >
                    {testimonial.isApproved ? "Approved" : "Pending"}
                  </button>
                  <button
                    onClick={() => handleEditTestimonial(testimonial)}
                    className="text-gray-600 hover:text-black"
                  >
                    <FaRegEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaRegTrashCan size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredTestimonials.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No testimonials found</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Testimonial Modal */}
      {isModalOpen && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F0E4CF] rounded-lg w-full max-w-2xl p-6 m-8 sm:m-8 lg:m-auto">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-4 text-[#B9703E]">Edit Testimonial</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-[#B9703E] mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-md font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={selectedTestimonial.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={selectedTestimonial.location}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-md font-medium mb-1">Rating</label>
                  <select
                    name="rating"
                    value={selectedTestimonial.rating}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-md font-medium mb-1">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={selectedTestimonial.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-md font-medium mb-1">Content</label>
                  <textarea
                    name="content"
                    value={selectedTestimonial.content}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isApproved"
                      checked={selectedTestimonial.isApproved}
                      onChange={handleInputChange}
                      className="mr-2 accent-[#8A9A5B]"
                    />
                    <span>Approved</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#B9703E] text-white rounded-md hover:bg-[#8A9A5B] transition-colors duration-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-[#8A9A5B] text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedTestimonial && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#F0E4CF] rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#B9703E]">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete this testimonial from <strong>{selectedTestimonial.name}</strong>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-[#B9703E] hover:text-white transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteTestimonial}
                className="px-4 py-2 bg-red-200 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300"
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

export default Testimonials
