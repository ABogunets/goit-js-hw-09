 // Notify import
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";

//Refs
const formRef = document.querySelector('form');
const firstDelayRef = document.querySelector('[name="delay"]');
const delayStepRef = document.querySelector('[name="step"]');
const amountRef = document.querySelector('[name="amount"]');

formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const firstDelay = +firstDelayRef.value;
  const delayStep = +delayStepRef.value;
  const amount = +amountRef.value;
  let promiseDelay = firstDelay;
  
  for (let promiseNumber = 1; promiseNumber <= amount; promiseNumber += 1) {
       createPromise(promiseNumber, promiseDelay)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      })
      .finally(() => { if (promiseNumber === amount) formRef.reset() })
    
    promiseDelay += delayStep;
  }
} 

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) =>{
      setTimeout(() => {
        if (shouldResolve) res({ position, delay })
        else rej({ position, delay })
        }, delay);
      });
  }


