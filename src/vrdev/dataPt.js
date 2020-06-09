
  AFRAME.registerComponent('dataPt', {
    schema: {
        
       
    },
    init: function () {
        //let point = document.createElement('a-box');
        this.setAttribute('light', {color: '#CCC', intensity: 1});
        this.setAttribute('geometry', {
            primitive: 'box',
            height: 1,
            width: 1
  });
    }
  });

  //30points in scatter