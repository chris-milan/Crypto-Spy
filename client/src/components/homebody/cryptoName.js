import React from 'react';
import Fade from '@material-ui/core/Fade';
import './homebody.css';

const CryptoName = ({ coin }) => {
  return (
    <Fade in timeout={1000} style={{ zIndex: 1501 }}>
      <div data-key={coin.id}>
        <div data-key={coin.id} className="coinBar coinHover">
          <h3 data-key={coin.id} className="coinBarDeets">
            {coin.rank}
          </h3>
          <h3 data-key={coin.id} className="coinBarDeets">
            {coin.name}
          </h3>
          <h3 data-key={coin.id} className="coinSymbolHome">
            ({coin.symbol})
          </h3>
          <h3 data-key={coin.id} className="coinBarDeets rightFloat">
            {coin.TwentyFourHr}
          </h3>
        </div>
      </div>
    </Fade>
  );
};

export default CryptoName;

// import React from 'react';

// const CryptoName = ({ coin }) => {
//   return (
//     <div data-key={coin.id}>
//       <div data-key={coin.id} className="coinBar">
//         <h3 data-key={coin.id} className="coinBarDeets">
//           {coin.rank}
//         </h3>
//         <h3 data-key={coin.id} className="coinBarDeets">
//           {coin.name}
//         </h3>
//         <h3 data-key={coin.id} className="coinSymbolHome">
//           ({coin.symbol})
//         </h3>
//         <h3 data-key={coin.id} className="coinBarDeets rightFloat">
//           {coin.TwentyFourHr}
//         </h3>
//       </div>
//     </div>
//   );
// };

// export default CryptoName;
