function locomotiveAnim(){
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });



  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
locomotiveAnim()

function navAnim(){
  gsap.to("#nav-part1 img",{
    transform:"translateY(-100%)"

  })
}
navAnim()
function vieoconAnimation(){
  var vieocon=document.querySelector(`#video-container`)
  var playbtn=document.querySelector(`#play`)
  vieocon.addEventListener(`mouseenter`,function(){
    gsap.to(playbtn,{
      scale:1,
      opacity:1
    })
   })
  vieocon.addEventListener(`mouseleave`,function(){
    gsap.to(playbtn,{
      scale:0,
      opacity:0
    })
  })
  vieocon.addEventListener(`mousemove`,function(dets){
    gsap.to(playbtn,{
      left:dets.x-80,
      top:dets.y-80
    })
  })
}
vieoconAnimation()

function loadingAnimation(){

  gsap.from(`#page1 h1`,{
    y:-100,
    opacity:0,
    delay:0.5,
    duration:1,
    stagger:0.5
  })
  gsap.from(`#page1 h3`,{
    y:100,
    opacity:0,
    delay:1,
    duration:2,
    stagger:0.3
  })
  gsap.from(`#page1 #video-container `,{
    scale:0.9,
    opacity:0,
    delay:1.5,
    duration:0.3,
    stagger:0.3
  })
}
loadingAnimation()
