import { Carousel } from "@material-tailwind/react";
import CarouselEvent from "./CarouselEvent";

export function AddSpotsCarousel({ newEvents }) {
  return (
    <Carousel navigation="" className="rounded-xl overflow-hidden shadow-2xl">
      {newEvents.map((event, index) => {
        return <CarouselEvent key={index} event={event} />;
      })}
    </Carousel>
  );
}
