function HouseMarker(latlng, args) {
    this.latlng = latlng;
    this.args = args;
    this.div = null;
}

HouseMarker.prototype = new google.maps.OverlayView();

HouseMarker.prototype.onAdd = function () {
    var self = this;
    var div = this.div;

    div = this.div = document.createElement('div');
        
    div.className = 'gmap-html-marker';
    /*
    div.style.position = "absolute";
    div.style.visibility = "visible";
    $(div).tinyDraggable();   //Make the overlay itself draggable
    */

    var extendHtml = '';
    if (window.$viewData.type === 'purchase') {
        extendHtml = '<div class="extend">'+self.args.data.prop_type_name+'</div>';
    }

    listPirce = parseFloat(self.args.data.list_price);
    if (!self.args.data.hasOwnProperty('price_flag')) {
      if (document.getElementById('language').getAttribute('content') === 'en-US') {
        self.args.data.list_price = Number(listPirce).toLocaleString();
      } else {
        if (window.$viewData.type === 'purchase') {
          self.args.data.list_price = Number(listPirce / 10000).toLocaleString(2);
        } else {
          self.args.data.list_price = Number(listPirce).toLocaleString(2);
        }
      }
      self.args.data.price_flag = true
    }

    div.innerHTML = '<div class="marker-container overlay">'+
        '<span class="price">'+self.args.data.list_price+'</span>'+
        extendHtml+
    '</div>';
    
    if (typeof(self.args.marker_id) !== 'undefined') {
        div.dataset.marker_id = self.args.marker_id;
    }
    
    google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(self, "click");
    });
    
    var panes = this.getPanes();
    //panes.overlayMouseTarget.appendChild(div);
    panes.overlayMouseTarget.appendChild(div);
};

HouseMarker.prototype.draw = function() {
    var div = this.div;
    
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
    
    if (point) {
        div.style.left = (point.x - div.offsetWidth / 2) + 'px';
        div.style.top = (point.y - div.offsetHeight - 6) + 'px';
    }
};

HouseMarker.prototype.remove = function() {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }   
};

HouseMarker.prototype.getPosition = function() {
    return this.latlng; 
};