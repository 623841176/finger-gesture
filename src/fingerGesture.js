import { setTimeout } from "core-js/library/web/timers";

let startX1, startY1, startX2, startY2, startLength, isDrag = false, isPinch = false;

function touchStartListener(ev) {
  // console.log(ev)
  startX1 = ev.touches[0].clientX;
  startY1 = ev.touches[0].clientY;
  if (ev.touches.length > 1) {
    startX2 = ev.touches[1].clientX;
    startY2 = ev.touches[1].clientY;
    if (!ev.scale) {
      let deltaX = startX1 - startX2;
      let deltaY = startY1 - startY2;
      startLength = Math.pow((deltaX * deltaX + deltaY * deltaY), 0.5);
    }
  }

}

function touchEndListener(ev) {
  setTimeout(function(){
    isDrag = false;
    isPinch = false;
  }, 0)
}

const touch = {
  on: (selecter, customEvent, callback) => {
    var selectedDom;
    if (typeof selecter === "string") {
      selectedDom = document.querySelector(selecter);
    } else {
      selectedDom = selecter;
    }
    selectedDom.removeEventListener('touchstart', touchStartListener, false)
    selectedDom.addEventListener('touchstart', touchStartListener, false)
    selectedDom.removeEventListener('touchend', touchEndListener, false)
    selectedDom.addEventListener('touchend', touchEndListener, false)
    switch (customEvent) {
      case 'drag':
        selectedDom.addEventListener('touchmove', (ev) => {
          if (ev.touches.length == 1 && isDrag) {
            callback(ev);
          }
        }, false)
        break;
      case 'dragstart':
        selectedDom.addEventListener('touchmove', (ev) => {
          if ((ev.touches[0].clientX != startX1 || startY1 != ev.touches[0].clientY) && !isDrag && ev.touches.length == 1) {
            isDrag = true;
            callback(ev);
          }
        }, false)
        break;
      case 'dragend':
        selectedDom.addEventListener('touchend', (ev) => {
          if (isDrag) {
            callback(ev);
          }
        }, false)
        break;
      case 'pinch':
        selectedDom.addEventListener('touchmove', (ev) => {
          if (ev.touches.length > 1 && isPinch) {
            if (!ev.scale) {
              let deltaX = ev.touches[0].clientX - ev.touches[1].clientX;
              let deltaY = ev.touches[0].clientY - ev.touches[1].clientY;
              let Length = Math.pow((deltaX * deltaX + deltaY * deltaY), 0.5);
              ev.scale = Length / startLength;
            }
            callback(ev);
          }
        }, false)
        break;
      case 'pinchstart':
        selectedDom.addEventListener('touchmove', (ev) => {
          if (ev.touches.length > 1 && (startX1 != ev.touches[0].clientX || startY1 != ev.touches[0].clientY || startX2 != ev.touches[1].clientX || startY2 != ev.touches[1].clientY) && !isPinch) {
            if (!ev.scale) {
              let deltaX = ev.touches[0].clientX - ev.touches[1].clientX;
              let deltaY = ev.touches[0].clientY - ev.touches[1].clientY;
              let Length = Math.pow((deltaX * deltaX + deltaY * deltaY), 0.5);
              ev.scale = Length / startLength;
            }
            isPinch = true;
            callback(ev);
          }
        }, false)
        break;
      case 'pinchend':
        selectedDom.addEventListener('touchend', (ev) => {
          if (isPinch) {
            callback(ev);
          }
        }, false)
        break;
    }
  }
}

export default touch;
