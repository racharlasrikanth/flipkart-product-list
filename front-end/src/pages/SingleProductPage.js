import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_ALL_PRODUCTS } from "./../utils";
import styled from "@emotion/styled";
import Loading from "../components/Loading";
import ProjectGallary from "../components/ProjectGallary";

function SingleProductPage() {
  const [singleProductData, setSingleProductData] = useState(null);
  const [similorProducts, setSimilorProducts] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ status: false, message: "" });

  const { id: productId } = useParams();

  const fetchSingleProduct = async (comingUrl) => {
    setIsLoading(true);
    setIsError({ status: false, message: "" });
    try {
      const response = await fetch(comingUrl);
      const { product, similorProducts = [] } = await response.json();
      setSingleProductData(product);
      setSimilorProducts(similorProducts);
      setIsLoading(false);
      setIsError({ status: false, message: "" });
    } catch (error) {
      setIsLoading(false);
      setIsError({
        status: true,
        message: error.message || "Something went wrong, please try again",
      });
    }
  };

  useEffect(() => {
    const sortByPriceProducts = similorProducts
      .filter((eachProd) => eachProd._id != singleProductData._id)
      .sort((a, b) => a.price - b.price);
    if (sortByPriceProducts.length != 0) {
      setSuggestion(sortByPriceProducts[0]);
    } else {
      setSuggestion(null);
    }
  }, [similorProducts]);

  useEffect(() => {
    fetchSingleProduct(`${GET_ALL_PRODUCTS}/${productId}`);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="paddingBottomDesktop-hundred paddingTopDesktop-hundred paddingBottomMobile-fifty paddingTopMobile-fifty wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <Wrapper className="single-product-container wrapper paddingBottomDesktop-hundred paddingTopDesktop-hundred paddingBottomMobile-fifty paddingTopMobile-fifty">
      <div className="single-product-center">
        <div className="slider-for-images">
          <ProjectGallary allImages={singleProductData.listOfImages} />
        </div>
        <div className="product-details">
          <div className="product-details-center">
            <div className="each-pair">
              <div className="key-heading">Brand</div>
              <div className="key-value">{singleProductData.brand}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Model Name</div>
              <div className="key-value">{singleProductData.modelName}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Type</div>
              <div className="key-value">{singleProductData.type}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Quantity</div>
              <div className="key-value">{singleProductData.weight}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Maximum Shelf Life</div>
              <div className="key-value">
                {singleProductData.maximumShelfLife}
              </div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Food Preference</div>
              <div className="key-value">{singleProductData.foodPrefernce}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Flavour</div>
              <div className="key-value">{singleProductData.flavour}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Ingredients</div>
              <div className="key-value">{singleProductData.ingredients}</div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Nutrient Content</div>
              <div className="key-value">
                {singleProductData.nutrientContent}
              </div>
            </div>
            <div className="each-pair">
              <div className="key-heading">Usage Instructions</div>
              <div className="key-value">
                {singleProductData.usageInstructions}
              </div>
            </div>
          </div>
        </div>
      </div>
      {suggestion && (
        <div className="similor-products-view">
          <h2>Similar Products</h2>
          <div className="suggestion-product">
            <div className="img-container">
              <img src={suggestion.image} alt="suggestion product" />
            </div>
            <div className="suggestion-prod-details">
              <h4>{suggestion.name}</h4>
              <div className="price">&#8377; {suggestion.price}</div>
              <div className="discount">
                <div className="old-price">&#8377; {suggestion.price + 10}</div>
                <div className="percentage">
                  {(suggestion.price / (suggestion.price + 10)) * 100}% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .single-product-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .product-details-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    .each-pair {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 1rem;
    }
    .key-heading,
    .key-value {
      font-size: 16px;
    }
    .key-heading {
      font-weight: bold;
      color: var(--clr-black);
    }
  }
  @media (min-width: 768px) {
    .single-product-center {
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }
  }
  .similor-products-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    .suggestion-product {
      background-color: var(--clr-white);
      box-shadow: var(--box-shadow-light);
      padding: 10px;
      border-radius: var(--radius);

      .img-container {
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        img {
          height: 100%;
          object-fit: contain;
        }
      }
    }

    .suggestion-prod-details {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      font-size: 16px;

      .price {
        font-size: 18px;
      }
      .discount {
        display: flex;
        gap: 1rem;
        align-items: center;

        .old-price {
          text-decoration: line-through;
          color: var(--clr-black-30);
        }
        .percentage {
          padding: 3px 10px;
          border-radius: var(--radius);
          background-color: var(--clr-green-light);
          color: var(--clr-green-dark);
          text-transform: uppercase;
        }
      }
    }
  }
`;

export default SingleProductPage;
