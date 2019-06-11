import React, { Component } from "react";
import { instance as axios } from "../utils/axiosConf";
import ImageGallery from "react-image-gallery";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

const images = [
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0071.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0071.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0073.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0073.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0082.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0082.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0091.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0091.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0096.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0096.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0117.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0117.jpg"
  },
  {
    original:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0126.jpg",
    thumbnail:
      "https://thumb.cloud.mail.ru/thumb/xw1/web/01.%2007.05.19%207_may/IMG_0126.jpg"
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
