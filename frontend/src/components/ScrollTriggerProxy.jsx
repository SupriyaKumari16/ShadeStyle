import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);


const ScrollTriggerProxy = () => {

  const { scroll } = useLocomotiveScroll();


  useEffect(() => {

    if (!scroll) {
      return;
    }


    const element = scroll.el;


    if (!element) {
      return;
    }


    /* =================================================
       LOCOMOTIVE → SCROLLTRIGGER
    ================================================= */

    const handleScroll = () => {
      ScrollTrigger.update();
    };


    scroll.on(
      "scroll",
      handleScroll
    );


    /* =================================================
       SCROLLER PROXY
    ================================================= */

    ScrollTrigger.scrollerProxy(
      element,
      {

        scrollTop(value) {

          if (arguments.length) {

            scroll.scrollTo(
              value,
              {
                duration: 0,
                disableLerp: true,
              }
            );

            return;
          }


          return (
            scroll.scroll.instance.scroll.y
          );
        },


        getBoundingClientRect() {

          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };

        },


        pinType:
          element.style.transform
            ? "transform"
            : "fixed",

      }
    );


    /* =================================================
       REFRESH
    ================================================= */

    const handleRefresh = () => {

      if (scroll) {
        scroll.update();
      }

    };


    ScrollTrigger.addEventListener(
      "refresh",
      handleRefresh
    );


    ScrollTrigger.refresh();


    /* =================================================
       CLEANUP
    ================================================= */

    return () => {

      scroll.off(
        "scroll",
        handleScroll
      );


      ScrollTrigger.removeEventListener(
        "refresh",
        handleRefresh
      );


      ScrollTrigger.getAll().forEach(
        (trigger) => {
          trigger.kill();
        }
      );

    };

  }, [scroll]);


  return null;
};


export default ScrollTriggerProxy;