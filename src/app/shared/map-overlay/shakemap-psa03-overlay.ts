import * as L from 'leaflet';

import { ProductContentPipe } from '../product-content.pipe';
import { ShakemapContoursOverlay } from './shakemap-contours-overlay';


const ShakemapPSA03Overlay = ShakemapContoursOverlay.extend({

  id: 'shakemap-psa03',
  title: 'Shakemap PSA03 Contours',
  legend: null,

  initialize: function (product) {
    ShakemapContoursOverlay.prototype.initialize.call(this);

    this.url = this.getUrl(product);
  },

  getUrl: function (product) {
    if (product == null) {
      return null;
    }

    const productContentPipe = new ProductContentPipe();
    const content = productContentPipe.transform(
        product,
        'download/cont_psa0p3.json',
        'download/cont_psa03.json'
    );

    return content ? content.url : null;
  },

  createLabel: function (feature) {
    return `${feature.properties.value} %g`;
  }

});

export { ShakemapPSA03Overlay };
