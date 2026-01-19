import React from 'react'
import AboutIntro from '../components/AboutIntro'
import TestimonialSection from '../components/TestimonialSection'
import ChauffeurBookingForm from '../components/ChauffeurBookingForm'


export default function about() {
    return (
        <div className='pageOffset'>
            <AboutIntro/>
            <TestimonialSection />
            <ChauffeurBookingForm />
        </div>
    )
}
