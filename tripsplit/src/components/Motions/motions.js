import {TweenMax, Power1} from 'gsap/TweenMax';
import { NONAME } from 'dns';

export const showLogin = () =>{
    const border = document.querySelector('.login-form');
    const form = document.querySelector('.login-form form');
    const tween = TweenMax.fromTo(form, 1.2, {display:"flex",opacity: "0"}, {opacity:"1"});
    
    return TweenMax.to(border, 1, {marginTop: '5%', onComplete:tween});
}

export const hideLogin = () =>{
    const border = document.querySelector('.login-form');
    const form = document.querySelector('.login-form form');
    const tween = TweenMax.to(border, .7, {marginTop: "0%"});
    
    return TweenMax.fromTo(form, .3, {opacity:"1"}, {opacity:"0", display: "none", onComplete: tween});

} 