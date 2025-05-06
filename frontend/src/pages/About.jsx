"use client"

import { useEffect, useRef } from "react"

// Translation object
const translations = {
  fr: {
    title: "À propos de FlorArt",
    subtitle: "L'art de la poterie inspiré par la nature",
    story: {
      title: "Notre Histoire",
      content:
        "FlorArt est né d'une passion pour l'artisanat et la céramique. Fondé en 2018 par une artiste marocaine, notre atelier crée des pièces uniques qui allient tradition et design contemporain. Chaque création est façonnée à la main avec des argiles sélectionnées avec soin et des émaux naturels.",
    },
    values: {
      title: "Nos Valeurs",
      sustainable: {
        title: "Durable",
        content: "Nous utilisons des matériaux naturels et des pratiques respectueuses de l'environnement.",
      },
      handmade: {
        title: "Fait Main",
        content: "Chaque pièce est façonnée individuellement, ce qui lui confère un caractère unique.",
      },
      quality: {
        title: "Qualité",
        content: "Nous nous engageons à créer des pièces durables qui résistent à l'épreuve du temps.",
      },
    },
    process: {
      title: "Notre Processus",
      steps: [
        {
          title: "Conception",
          content: "Chaque pièce commence par un croquis inspiré par les formes et textures naturelles.",
        },
        {
          title: "Façonnage",
          content: "L'argile est soigneusement façonnée à la main ou au tour de potier.",
        },
        {
          title: "Séchage",
          content: "Les pièces sèchent lentement pour éviter les fissures et déformations.",
        },
        {
          title: "Première Cuisson",
          content: "Les pièces sont cuites à haute température pour les solidifier.",
        },
        {
          title: "Émaillage",
          content: "Des émaux naturels sont appliqués pour la couleur et la finition.",
        },
        {
          title: "Cuisson Finale",
          content: "Une dernière cuisson fixe l'émail et finalise la pièce.",
        },
      ],
    },
  },
  en: {
    title: "About FlorArt",
    subtitle: "The art of pottery inspired by nature",
    story: {
      title: "Our Story",
      content:
        "FlorArt was born from a passion for craftsmanship and ceramics. Founded in 2018 by a Moroccan artist, our workshop creates unique pieces that combine tradition and contemporary design. Each creation is handcrafted with carefully selected clays and natural glazes.",
    },
    values: {
      title: "Our Values",
      sustainable: {
        title: "Sustainable",
        content: "We use natural materials and environmentally friendly practices.",
      },
      handmade: {
        title: "Handmade",
        content: "Each piece is individually crafted, giving it a unique character.",
      },
      quality: {
        title: "Quality",
        content: "We are committed to creating durable pieces that stand the test of time.",
      },
    },
    process: {
      title: "Our Process",
      steps: [
        {
          title: "Design",
          content: "Each piece begins with a sketch inspired by natural shapes and textures.",
        },
        {
          title: "Shaping",
          content: "Clay is carefully shaped by hand or on the potter's wheel.",
        },
        {
          title: "Drying",
          content: "Pieces dry slowly to prevent cracks and deformations.",
        },
        {
          title: "First Firing",
          content: "Pieces are fired at high temperature to solidify them.",
        },
        {
          title: "Glazing",
          content: "Natural glazes are applied for color and finish.",
        },
        {
          title: "Final Firing",
          content: "A final firing sets the glaze and completes the piece.",
        },
      ],
    },
  },
}

function About({ language }) {
  const t = translations[language]

  return (
    <div>

      {/* Story Section */}
      <section className=" bg-[#F0E4CF]/30 py-16 sm:py-16 md:py-24 opacity-1">
        <div className="container-custom opacity-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="h-full">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-[#bc6c39] mb-4 py-4">{t.title}</h1>
              <p className="text-center sm:text-center md:text-left text-lg leading-relaxed py-6">{t.story.content}</p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner.jpg-6YGlYomaEwH5MkZ1JzG8A5l3rHmkWq.jpeg"
                alt="FlorArt Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-[#F0E4CF]/50 opacity-1">
        <div className="container-custom opacity-1">
          <h2 className="section-title">{t.values.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card bg-white/60 hover:bg-white/80 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#bc6c39]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#bc6c39]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.values.sustainable.title}</h3>
              <p>{t.values.sustainable.content}</p>
            </div>
            <div className="value-card bg-white/60 hover:bg-white/80 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#bc6c39]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#bc6c39]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.values.handmade.title}</h3>
              <p>{t.values.handmade.content}</p>
            </div>
            <div className="value-card bg-white/60 hover:bg-white/80 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-[#bc6c39]/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#bc6c39]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.values.quality.title}</h3>
              <p>{t.values.quality.content}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-[#F0E4CF]/30 opacity-1">
        <div className="container-custom opacity-1">
          <h2 className="section-title">{t.process.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.process.steps.map((step, index) => (
              <div key={index} className="process-step bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="w-10 h-10 bg-[#bc6c39]/80 text-white rounded-full flex items-center justify-center mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p>{step.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
