angular.module('ngPinchable', [])
.directive('ngPinchable', function () {
  return {
    restrict: 'AE',
     scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            scaleFactor: '@',
            maxZoom: '@'
          },
    link: function ($scope, element, attrs) {
      console.log("link ngPinchable");
      console.log("element: "+element);
      myElement = element[0];

      var hammertime = new Hammer(myElement);
      hammertime.get('pinch').set({ enable: true });

      var posX = 0,
      posY = 0,
      scale = 1,
      last_scale = 1,
      last_posX = 0,
      last_posY = 0,
      max_pos_x = 0,
      max_pos_y = 0,
      transform = "",
      el = myElement;
      scaleFactor = $scope.scaleFactor;

      
      //respond to zoom
      $scope.$on('ZOOM IN', function(event) {
        el.style.transition = "all .5s";
        scale *= scaleFactor;
        updateTransform();
        last_scale = scale;
      });

      $scope.$on('ZOOM OUT', function(event) {
        el.style.transition = "all .5s";
        scale /= scaleFactor;
       updateTransform();
       last_scale = scale;
      });

      updateTransform = function(){

        //constrain the zoom
        if(scale > $scope.maxZoom){
          scale = $scope.maxZoom;
        }
        else if(scale <=  1){
          //do not zoom out less than 100%
          scale = 1;
          posX = 0;
          posY = 0;
          last_posX = posX;
          last_posY = posY;
        }

          transform =
            "translate(" + posX + "px," + posY + "px) " +
            "scale(" + scale + ", " + scale + ")";

          if (transform) {
            el.style.webkitTransform = transform;
          }  
      }
   
      el.addEventListener("mousedown", function(){ console.log("mousedown"); });

      hammertime.on('doubletap pan pinch panend pinchend', function(ev) {

        console.log("hammertime event: ", ev);

         //i try to disable the pinch to zoom shit
         ev.preventDefault();

        if (ev.type == "doubletap") {
          el.style.transition = "all .5s";

          if(scale>1)
            scale = 1;
          else
            scale = 2;

          last_scale = scale;
          updateTransform();
        }

                //pan   
                if(ev.type == "pan" || ev.type == "pinch") {
                if (scale != 1) {
                  el.style.transition = "none";
                  posX = last_posX + ev.deltaX;
                  posY = last_posY + ev.deltaY;
                  max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
                  max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
                  if (posX > max_pos_x) {
                    posX = max_pos_x;
                  }
                  if (posX < -max_pos_x) {
                    posX = -max_pos_x;
                  }
                  if (posY > max_pos_y) {
                    posY = max_pos_y;
                  }
                  if (posY < -max_pos_y) {
                    posY = -max_pos_y;
                  }
                }
              }

                //pinch
                if (ev.type == "pinch") {
                  el.style.transition = "none";
                  scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
                }
                if(ev.type == "pinchend"){last_scale = scale;}

                //panend
                if(ev.type == "panend"){
                  last_posX = posX < max_pos_x ? posX : max_pos_x;
                  last_posY = posY < max_pos_y ? posY : max_pos_y;
                }

                updateTransform();
              });
              
        } //DOM manipulation 
        
      }
    });
