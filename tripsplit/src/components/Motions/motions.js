import {TweenMax, Power1, TweenLite, TimelineMax} from 'gsap/TweenMax';
import styled from 'styled-components'
import img57 from '../../img/57.jpg';import img17 from '../../img/17.jpg';import img46 from '../../img/46.jpg';
import img21 from '../../img/21.jpg';import img33 from '../../img/33.jpg';import img43 from '../../img/43.jpg';
import img24 from '../../img/24.jpg';import img5 from '../../img/5.jpg';import img13 from '../../img/13.jpg';
import img7 from '../../img/7.jpg';import img19 from '../../img/19.jpg';import img2 from '../../img/2.jpg';
import img6 from '../../img/6.jpg';import img12 from '../../img/12.jpg';import img48 from '../../img/48.jpg';
import img20 from '../../img/20.jpg';import img54 from '../../img/54.jpg';import img40 from '../../img/40.jpg';
import img42 from '../../img/42.jpg';import img16 from '../../img/16.jpg';import img30 from '../../img/30.jpg';
import img22 from '../../img/22.jpg';import img49 from '../../img/49.jpg';import img31 from '../../img/31.jpg';
import img27 from '../../img/27.jpg';import img44 from '../../img/44.jpg';import img59 from '../../img/60.jpg';
import img32 from '../../img/32.jpg';import img29 from '../../img/29.jpg';import img14 from '../../img/14.jpg';
import img18 from '../../img/18.jpg';import img56 from '../../img/56.jpg';import img51 from '../../img/51.jpg';
import img4 from '../../img/4.jpg';import img41 from '../../img/41.jpg';import img58 from '../../img/58.jpg';
import img35 from '../../img/35.jpg';import img53 from '../../img/53.jpg';import img26 from '../../img/26.jpg';
import img8 from '../../img/8.jpg';import img37 from '../../img/37.jpg';import img1 from '../../img/1.jpg';
import img36 from '../../img/36.jpg';import img55 from '../../img/55.jpg';import img38 from '../../img/38.jpg';
import img47 from '../../img/47.jpg';import img10 from '../../img/10.jpg';import img25 from '../../img/25.jpg';
import img28 from '../../img/28.jpg';import img50 from '../../img/50.jpg'; import img0 from '../../img/0.jpg';
import img34 from '../../img/34.jpg';import img15 from '../../img/15.jpg';import img60 from '../../img/60.jpg';
import img52 from '../../img/52.jpg';import img9 from '../../img/9.jpg';import img39 from '../../img/39.jpg';
import img45 from '../../img/45.jpg';import img23 from '../../img/23.jpg';import img3 from '../../img/3.jpg';

const imageArray = [img3,img57,img17,img46,img21,img33,img43,img24,img5,img13,
    img7,img19,img2,img6,img12,img48,img14,img20,img54,img40,
    img42,img16,img30,img22,img49,img31,img27,img44,img59,img32,
    img29,img18,img56,img51,img4,img41,img58,img35,img53,
    img26,img8,img37,img1,img36,img55,img38,img47,img10,img25,
    ,img28,img50,img34,img15,img60,img52,img9,img39,img45,
    img23,img3, img0];

export const showLogin = () =>{
    const border = document.querySelector('.form-area');
    const form = document.querySelector('.login-form form');
    const tween2 = TweenMax.fromTo(form, 1.2, {display:"flex",opacity: "0"}, {opacity:"1"});    
    return TweenMax.fromTo(border, 1, {width: '0%'}, {display:'flex',width: '60%',marginTop: '5%', onComplete:tween2});
}

export const hideLogin = () =>{
    const border = document.querySelector('.form-area');
    const form = document.querySelector('.login-form form');
    const tween = TweenMax.to(border, 1, {display: 'none', width: '0%'}); 
    const inputs = form.childNodes;
    inputs.forEach(input => {
        input.value = null;
    })   
    return TweenMax.fromTo(form, .3, {opacity:"1"}, {opacity:"0", display: "none", onComplete: tween});
} 

export const showRegister = () =>{
    const border = document.querySelector('.form-area');
    const form = document.querySelector('.registration-form form');
    const tween = TweenMax.fromTo(form, 1.2, {display:"flex",opacity: "0"}, {opacity:"1"});    
    return TweenMax.fromTo(border, 1, {width: '0%'}, {display:'flex',width: '60%',marginTop: '5%', onComplete:tween});
}

export const hideRegister = () =>{
    const border = document.querySelector('.form-area');
    const form = document.querySelector('.registration-form form');
    const tween = TweenMax.to(border, 1, {display: 'none', width: '0%'});   
    const inputs = form.childNodes;
    inputs.forEach(input => {
        input.value = null;
    })
    return TweenMax.fromTo(form, .3, {opacity:"1"}, {opacity:"0", display: "none", onComplete: tween});

}

export const background = () =>{
    const page = document.querySelector('.carousel')
     
    let image = () => {
        let index = Math.floor(Math.random() * 60); 
        //console.log(index)
        page.style.backgroundImage = `url(${imageArray[index]})`;
     }
    let display = new TimelineMax({repeat:500, repeatDelay:0}); 
    display.add(TweenLite.fromTo(page, 4, {opacity:'0'}, {opacity:'.8', filter: 'blur(.5px)', onComplete: image}));


    return display;
}

//backgroundImage: `url(${image()})`