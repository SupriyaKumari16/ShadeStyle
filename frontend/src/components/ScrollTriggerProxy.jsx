import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLocomotiveScroll } from "react-locomotive-scroll";

gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!scroll || !scroll.el) {
      return;
    }

    const element = scroll.el;

    // Prevent old Locomotive instance from being used
    // after React route navigation/unmount.
    let isActive = true;

    const handleScroll = () => {
      if (!isActive) return;

      ScrollTrigger.update();
    };

    const handleRefresh = () => {
      if (!isActive) return;

      try {
        scroll.update();
      } catch (error) {
        // Old Locomotive instance can already be destroyed
      }
    };

    /* =========================================
       LOCOMOTIVE → SCROLLTRIGGER
    ========================================= */

    scroll.on("scroll", handleScroll);

    /* =========================================
       SCROLLER PROXY
    ========================================= */

    ScrollTrigger.scrollerProxy(element, {
      scrollTop(value) {
        // If this proxy belongs to an old route,
        // never touch the destroyed Locomotive instance.
        if (!isActive) {
          return 0;
        }

        try {
          if (arguments.length) {
            scroll.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            });

            return;
          }

          return (
            scroll?.scroll?.instance?.scroll?.y || 0
          );
        } catch (error) {
          return 0;
        }
      },

      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },

      pinType: element.style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener(
      "refresh",
      handleRefresh
    );

    // Clear old route scroll positions.
    ScrollTrigger.clearScrollMemory("manual");

    // Refresh only after the current instance is ready.
    requestAnimationFrame(() => {
      if (isActive) {
        ScrollTrigger.refresh();
      }
    });

    /* =========================================
       CLEANUP
    ========================================= */

    return () => {
      // VERY IMPORTANT:
      // Make the old proxy completely inactive first.
      isActive = false;

      scroll.off("scroll", handleScroll);

      ScrollTrigger.removeEventListener(
        "refresh",
        handleRefresh
      );

      // Kill all triggers belonging to the old page.
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });

      // Prevent ScrollTrigger from restoring
      // the previous route's scroll position.
      ScrollTrigger.clearScrollMemory("manual");
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;