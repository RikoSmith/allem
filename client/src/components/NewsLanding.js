import React, { Component } from "react";
import { instance as axios } from "../utils/axiosConf";
import ImageGallery from "react-image-gallery";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original: "http://lorempixel.com/1000/600/nature/1/",
    thumbnail: "http://lorempixel.com/250/150/nature/1/"
  },
  {
    original: "http://lorempixel.com/1000/600/nature/2/",
    thumbnail: "http://lorempixel.com/250/150/nature/2/"
  },
  {
    original: "http://lorempixel.com/1000/600/nature/3/",
    thumbnail: "http://lorempixel.com/250/150/nature/3/"
  }
];

class NewsLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <ImageGallery
            items={images}
            showThumbnails={false}
            showNav={true}
            showPlayButton={false}
            showBullets={true}
            autoPlay={true}
          />
        </div>
        <div className="col-md-6">
          <h2>Title title title</h2>
          <p>Lorem ipsum dolor sit amet asd asda sdfdjd jsjfsad asdhasd</p>
        </div>
      </div>
    );
  }
}

export default NewsLanding;
