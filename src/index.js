import touch from './fingerGesture'
console.log(touch)

let imgContainer = document.querySelector('#_imgDiv');

let startX, startY;
touch.on(imgContainer, 'dragstart', (ev) => {
  startX = ev.touches[0].clientX - imgContainer.offsetLeft;
  startY = ev.touches[0].clientY - imgContainer.offsetTop;
  ev.cancelBubble = true;
  ev.preventDefault();
})
touch.on(imgContainer, 'drag', (ev) => {
  imgContainer.style.left = `${ev.touches[0].clientX - startX}px`;
  imgContainer.style.top = `${ev.touches[0].clientY - startY}px`;
  ev.cancelBubble = true;
  ev.preventDefault();
})

touch.on(imgContainer, 'dragend', (ev) => {
  ev.cancelBubble = true;
  ev.preventDefault();
})

let startWidthPersent, startXPersent, startYPersent;
touch.on(imgContainer, 'pinchstart', (ev) => {
  startWidthPersent = imgContainer.style.width.replace(/%/, "");
  let centerX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
  let centerY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
  startXPersent = (centerX - imgContainer.offsetLeft) / imgContainer.offsetWidth;
  startYPersent = (centerY - imgContainer.offsetTop) / imgContainer.offsetHeight;
  ev.cancelBubble = true;
  ev.preventDefault();
})

touch.on(imgContainer, 'pinch', (ev) => {
  if (!ev.scale) return;
  let widthpersent = startWidthPersent * ev.scale;
  // widthpersent = widthpersent < 90 ? 90 : widthpersent;
  imgContainer.style.width = `${widthpersent}%`;
  let centerX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2
  let centerY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2
  imgContainer.style.left = centerX - startXPersent * imgContainer.offsetWidth + 'px';
  imgContainer.style.top = centerY - startYPersent * imgContainer.offsetHeight + 'px';
  ev.cancelBubble = true;
  ev.preventDefault();
})

touch.on(imgContainer, 'pinchend', (ev) => {
  ev.cancelBubble = true;
  ev.preventDefault();
})