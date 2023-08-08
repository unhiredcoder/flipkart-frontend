import React, { useState, useEffect } from 'react';
import { InputBase, Box, List, styled, ListItem, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { getProducts } from '../../redux/actions/productAction';


const SearchContainer = styled(Box)(({ theme, isExpanded }) => ({
  background: '#fff',
  width: '38%',
  borderRadius: '2px',
  marginRight:'10px',
  display: 'flex',
  transform: 'translateX(50px)',
  transition:'all .3s',
  [theme.breakpoints.down('sm')]: {
  transform: !isExpanded ? 'translateX(50px)' :'translateX(0px)',
    width: !isExpanded ? '0%' : '100%',
    marginLeft: !isExpanded ? '100px' : '-90px',
  },
}));


const InputSearchBox = styled(InputBase)({
  paddingLeft: '20px',
  width: '100%',
});
const SearchIconContainer = styled(Box)({
  color: 'blue',
  display: 'flex',
  alignItems: 'center',
  marginRight: 5,
  padding: '5px',
});

const SearchLists = styled(List)(({ theme }) => ({
  position: 'absolute',
  background: '#fff',
  fontSize: 13,
  fontFamily: 'sans-serif',
  color: '#000',
  marginTop: '45px',
  minWidth: '100%',
  [theme.breakpoints.down('md')]: {
    overflow: 'auto',
    maxHeight: '50vh',
  },
}));


const SearchListItem = styled(ListItem)({
  '&:hover': {
    background: '#f1f1f1'
  },
});


const Search = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  const { products } = useSelector((state) => state.getproducts?.products);
  console.log(products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const [text, setText] = useState('');
  const [showResults, setShowResults] = useState(false); // New state variable to track Enter key press

  const handleInputChange = (value) => {
    setText(value);
    setShowResults(false); // Reset showResults to false when user types something new
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowResults(true); // Set the state to true when Enter key is pressed
      setText('')
      setIsExpanded(false)
      navigate('/search-results', { state: { filteredData: filteredProducts } });
      if (filteredProducts < 1) {
        setText('')
      setIsExpanded(false)

      }
    }
  };

  // Filter the products based on the user's input
  const filteredProducts = products?.filter(
    (product) => product.title?.longTitle.toLowerCase().includes(text.toLowerCase())
  );

  return (
    <SearchContainer isExpanded={isExpanded}>
      <InputSearchBox
        spellCheck={false}
        placeholder='Search for Products, Brands and More.'
        value={text}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleEnterKeyPress} // Listen for Enter key press
      />
      <SearchIconContainer onClick={() => setIsExpanded(!isExpanded)}>
      <SearchIcon color='white' />
      </SearchIconContainer>
      {text && !showResults && (
        <SearchLists>
          {filteredProducts.map((filteredProduct) => (
            <SearchListItem key={filteredProduct.id}>
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={() => {
                  setText('');
                  setIsExpanded(false)
                  setShowResults(false); // Set the state to false when the user clicks a suggestion
                }}
                to={`/product/detail/${filteredProduct.id}`}
              >
                {filteredProduct.title?.longTitle}
              </Link>
            </SearchListItem>
          ))}
        </SearchLists>
      )}
    </SearchContainer>
  );
};

export default Search;
