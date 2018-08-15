import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import './modal.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
    changeFilter: false,
    currentFilter: 'none',
    optionalFilters: ['saturate(20%)', 'contrast(200%)', 'grayscale(50%)','hue-rotate(90deg)', 'sepia(100%)'],
    img: props.dto,
    isExpand: false,
    urlImage: `url(${this.urlFromDto(this.props.dto)})`
    };
}


  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size: size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  onClone(){
    this.props.callBack(this.props.dto);
  }

   changeFilterOnclick() {
  const rand =Math.floor(Math.random() * 5) ;
   this.setState({ currentFilter: String(this.state.optionalFilters[rand])})
   }

   showModal = () => {
    this.setState({ isExpand: !this.state.isExpand });
  };

  hideModal = () => {
    this.setState({ isExpand: false });
  };


  render() {
    return (
      <div
      
        className="image-root"
                  style={{
                 backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
                 width: this.state.size + 'px',
                 height: this.state.size + 'px',
                 WebkitFilter:   this.state.currentFilter
               }}

        >
        <div>
          <FontAwesome className="image-icon" name="clone" title="clone" onClick={this.onClone.bind(this)}/>
          <FontAwesome className="image-icon" name="filter" title="filter" onClick={() => {this.changeFilterOnclick()}} />
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={this.showModal} />
          <Modal show={this.state.isExpand} handleClose={this.hideModal} children= {this.state.urlImage}>
          </Modal>
        </div>
      </div>
    );
  }
}



const Modal = ({ handleClose, show ,children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  const img = children;
  return (
    <div className={showHideClassName}>
    <section className="modal-main" style={{backgroundImage: img }}>
      <button onClick={handleClose}>close</button>
    </section>
    
  </div>
  );
};
export default Image;
