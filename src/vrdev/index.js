function main(){
    var sceneEl = document.querySelector('a-scene');
    var entityEl = document.createElement('a-entity');
    entityEl.setAttribute('light', {color: '#CCC', intensity: 1});
    entityEl.setAttribute('geometry', {
      primitive: 'box',
       height: 1,
      width: 1
  });
  //   entityEl.setAttribute('position', {x: 10, y: 2, z: 3});

    sceneEl.appendChild(entityEl);
}