import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.handleScroll=this.handleScroll.bind(this);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      isLoading: false
    };
  }

  getGalleryWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({images: res.photos.photo});
        }
      });
  }

  handleScroll = (e) => {
    const el = e.target.documentElement;
    const bottom = el.scrollHeight - el.scrollTop === el.clientHeight;
    if (bottom) {
     }
  }

//   addMoreImages(tag){

//     const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
//     const baseUrl = 'https://api.flickr.com/';
//     axios({
//       url: getImagesUrl,
//       baseURL: baseUrl,
//       method: 'GET'
//     })
//       .then(res => res.data)
//       .then(res => {
//         if (
//           res &&
//           res.photos &&
//           res.photos.photo &&
//           res.photos.photo.length > 0
//         ) {
//           this.setState((prevState)=>{
//             prevState.images.push(res.photos.photo);
//      });
//     }
//   });
// }

    clone(img){
      this.setState(
           (prevState)=>{
                  prevState.images.push(img);
                  return {images:prevState.images}
           }
      );
    }

  componentDidMount() {
    window.addEventListener('scroll',this.handleScroll);
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
}

  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  render() {
    return (
      <div  className="gallery-root">
        {this.state.images.map((dto , i) => {
          return <Image key={'image-' + dto.id+ i.toString()} dto={dto} callBack={this.clone.bind(this)} galleryWidth={this.state.galleryWidth}/>;
        })}
      </div>
    );
  }
}

export default Gallery;
