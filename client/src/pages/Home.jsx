import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center mt-4">
        <div className="create-a-post py-2 w-full max-w-md">
          <button className="flex items-center justify-center gap-2 bg-primary text-secondary border hover:bg-transparent hover:text-primary border-primary w-full py-2 rounded-lg font-semibold focus:outline-none">
            <CiCirclePlus className="text-3xl" />
            Create a post
          </button>
        </div>
      </div>
      <div className="newsfeed mt-6">
        <div className="post rounded-lg overflow-hidden">
          <div className="post-header flex items-center gap-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="text-primary font-semibold">John Doe</h4>
              <p className="text-primary text-sm">2 hours ago</p>
            </div>
          </div>
          <div className="post-content p-4">
            <p className="text-primary mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptate, quae, quidem, iure quos nesciunt voluptatum deserunt
              impedit doloribus accusamus quibusdam. Quisquam, voluptate
              voluptatum. Quisquam, voluptate voluptatum.
            </p>
            <Slider {...settings}>
              <div>
                <img
                  src="https://www.harboroughmail.co.uk/webimg/T0FLMTIzNzA0NzMw.jpg"
                  alt="Slide 1"
                  className="w-full"
                />
              </div>
              <div>
                <img
                  src="https://www.harboroughmail.co.uk/webimg/T0FLMTIzNzA0NzMw.jpg"
                  alt="Slide 2"
                  className="w-full"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
