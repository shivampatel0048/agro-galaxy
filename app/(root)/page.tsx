import { AboutSection } from '@/components/landing/AboutSection'
import { Hero } from '@/components/landing/Hero'
import { ProductsSection } from '@/components/landing/ProductsSection'
import { SubscriptionSection } from '@/components/landing/SubscriptionSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import React from 'react'

const Page = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProductsSection />
      <TestimonialsSection />
      <SubscriptionSection />
    </main>
  )
}

export default Page