import BookingForm from "./components/BookingForm";
import ChauffeurBookingForm from "./components/ChauffeurBookingForm";
import ExecutiveCar from "./components/ExecutiveCar";
import FleetSection from "./components/FleetSection";
import OurFleetInfo from "./components/OurFleetInfo";
import OurServices from "./components/OurServices";
import SliderBanner from "./components/SliderBanner";
import TestimonialSection from "./components/TestimonialSection";
import WhyChooseUs from "./components/WhyChooseUs";
import WhyWeAreTheBest from "./components/WhyWeAreTheBest";
import Fleet from "./fleet/page";


export default function HomePage() {
  return (
    <main className="pageOffset" >
      <SliderBanner />
      <BookingForm />
      <ExecutiveCar/>
      <OurFleetInfo />
      {/* <OurServices /> */}
      <FleetSection />
      <ChauffeurBookingForm />
      <WhyWeAreTheBest />
      <TestimonialSection />
      <WhyChooseUs />
    </main>
  );
}
