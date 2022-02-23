import React from 'react';

function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <div className='cards__item__link'>

          {/* feeature image */}
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Image'
              src={props.src}
            />
          </figure>
          
          {/* feature description */}
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
            <h5 className='cards__item__text2'>{props.description}</h5>
          </div>

        </div>
      </li>
    </>
  );
}

export default CardItem;
