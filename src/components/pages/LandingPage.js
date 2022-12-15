import React from 'react'
import LandingPageNav from '../landingPageSections/LandingPageNav'
import RightJobSection from '../landingPageSections/RightJobSection'
import OnePlateform from '../landingPageSections/OnePlateform'
import FeatureJobs from '../landingPageSections/FeatureJobs'
import CvUpload from '../landingPageSections/CvUpload'
import Footer from '../landingPageSections/Footer'
function LandingPage() {
  return (
    <div>
      <LandingPageNav />
      <RightJobSection />
      <OnePlateform />
      <FeatureJobs />
      <CvUpload />
      <Footer />
    </div>
  )
}

export default LandingPage