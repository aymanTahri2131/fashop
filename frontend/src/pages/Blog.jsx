"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

// Translation object
const translations = {
  fr: {
    title: "Blog",
    subtitle: "Découvrez nos articles sur la poterie et l'artisanat",
    readMore: "Lire la suite",
    categories: "Catégories",
    all: "Toutes",
    techniques: "Techniques",
    inspiration: "Inspiration",
    events: "Événements",
    behindTheScenes: "Coulisses",
    search: "Rechercher",
    recentPosts: "Articles récents",
  },
  en: {
    title: "Blog",
    subtitle: "Discover our articles about pottery and craftsmanship",
    readMore: "Read More",
    categories: "Categories",
    all: "All",
    techniques: "Techniques",
    inspiration: "Inspiration",
    events: "Events",
    behindTheScenes: "Behind the Scenes",
    search: "Search",
    recentPosts: "Recent Posts",
  },
}

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: {
      fr: "L'art de la poterie traditionnelle marocaine",
      en: "The Art of Traditional Moroccan Pottery",
    },
    excerpt: {
      fr: "Découvrez les techniques ancestrales de la poterie marocaine et comment elles influencent notre travail...",
      en: "Discover the ancestral techniques of Moroccan pottery and how they influence our work...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-05-10",
    author: "Sarah El Mansouri",
    category: "techniques",
    tags: ["tradition", "artisanat", "maroc"],
  },
  {
    id: 2,
    title: {
      fr: "Comment choisir le bon vase pour vos plantes",
      en: "How to Choose the Right Vase for Your Plants",
    },
    excerpt: {
      fr: "Guide pratique pour sélectionner le vase parfait en fonction de vos plantes et de votre intérieur...",
      en: "Practical guide to selecting the perfect vase based on your plants and interior...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-04-28",
    author: "Karim Benali",
    category: "inspiration",
    tags: ["décoration", "plantes", "conseils"],
  },
  {
    id: 3,
    title: {
      fr: "Reportage: Notre participation au Salon de l'Artisanat",
      en: "Report: Our Participation in the Craft Fair",
    },
    excerpt: {
      fr: "Retour sur notre expérience au Salon International de l'Artisanat de Marrakech...",
      en: "Looking back at our experience at the Marrakech International Craft Fair...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-04-15",
    author: "Yasmine Alaoui",
    category: "events",
    tags: ["événement", "exposition", "marrakech"],
  },
  {
    id: 4,
    title: {
      fr: "Dans les coulisses: Le processus de création d'une collection",
      en: "Behind the Scenes: The Process of Creating a Collection",
    },
    excerpt: {
      fr: "Découvrez les étapes de conception et de réalisation de notre nouvelle collection printemps...",
      en: "Discover the design and production stages of our new spring collection...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-03-22",
    author: "Mohammed Tazi",
    category: "behindTheScenes",
    tags: ["création", "collection", "processus"],
  },
  {
    id: 5,
    title: {
      fr: "Les tendances de la céramique en 2023",
      en: "Ceramic Trends in 2023",
    },
    excerpt: {
      fr: "Analyse des nouvelles tendances en matière de céramique et de poterie pour cette année...",
      en: "Analysis of new trends in ceramics and pottery for this year...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-03-05",
    author: "Leila Benjelloun",
    category: "inspiration",
    tags: ["tendances", "design", "2023"],
  },
  {
    id: 6,
    title: {
      fr: "Technique: Comment réaliser un émaillage parfait",
      en: "Technique: How to Achieve Perfect Glazing",
    },
    excerpt: {
      fr: "Guide étape par étape pour maîtriser l'art délicat de l'émaillage de vos pièces en céramique...",
      en: "Step-by-step guide to mastering the delicate art of glazing your ceramic pieces...",
    },
    content: {
      fr: "Contenu complet de l'article...",
      en: "Full article content...",
    },
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-02-18",
    author: "Ahmed Chaoui",
    category: "techniques",
    tags: ["émaillage", "technique", "tutoriel"],
  },
]

function Blog({ language }) {
  const t = translations[language]
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(language === "fr" ? "fr-FR" : "en-US", options)
  }

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Get recent posts (top 3)
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Blog Posts */}
            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title[language]}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{formatDate(post.date)}</span>
                          <span className="mx-2">•</span>
                          <span>{post.author}</span>
                        </div>
                        <h2 className="text-xl font-semibold mb-3">{post.title[language]}</h2>
                        <p className="text-gray-600 mb-4">{post.excerpt[language]}</p>
                        <Link
                          to={`/blog/${post.id}`}
                          className="text-primary hover:text-accent transition-colors duration-200"
                        >
                          {t.readMore} →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No posts found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{t.search}</h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`${t.search}...`}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{t.categories}</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === "all" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                  >
                    {t.all}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("techniques")}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === "techniques" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                  >
                    {t.techniques}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("inspiration")}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === "inspiration" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                  >
                    {t.inspiration}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("events")}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === "events" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                  >
                    {t.events}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSelectedCategory("behindTheScenes")}
                    className={`w-full text-left px-2 py-1 rounded-md transition-colors ${selectedCategory === "behindTheScenes" ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                  >
                    {t.behindTheScenes}
                  </button>
                </li>
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{t.recentPosts}</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">
                        <Link
                          to={`/blog/${post.id}`}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          {post.title[language]}
                        </Link>
                      </h4>
                      <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
