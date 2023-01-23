    
import { save, load } from "./storage.js";//фунцкії для роботи з Localstorage
import throttle from 'lodash.throttle';

// initialization of the player
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = "videoplayer-current-time";

player.on('timeupdate', throttle(onTimeupdate, 1000));

function onTimeupdate({ seconds }) {
  save(STORAGE_KEY, seconds);
}
const durationTime = load(STORAGE_KEY);
player.setCurrentTime(durationTime || 0);

