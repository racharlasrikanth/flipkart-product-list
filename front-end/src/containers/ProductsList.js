import React from "react";
import CustomTable from "./../components/CustomTable";
import Button from "../components/Button";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ProductsList({ data }) {
  console.log(data);
  const columns = [
    {
      id: "image",
      heading: "Image",
      customCellStyles: { minWidth: "70px" },
      renderCell: (row) => ImageCell(row),
    },
    {
      id: "brand",
      heading: "Name",
      customCellStyles: { minWidth: "170px" },
      renderCell: (row) => NameCell(row),
    },
    {
      id: "weight",
      heading: "Weight",
      customCellStyles: { minWidth: "100px" },
    },
    {
      id: "price",
      heading: "Price",
      customCellStyles: { minWidth: "170px" },
      renderCell: (row) => PriceCell(row),
    },
    {
      id: "quantity",
      heading: "Quantity",
      customCellStyles: { minWidth: "170px" },
      renderCell: (row) => QuantityCell(row),
    },
    {
      id: "action",
      heading: "Action",
      customCellStyles: { minWidth: "170px" },
      renderCell: (row) => ActionCell(row),
    },
  ];

  const NameCell = (row) => {
    return (
      <div className="name-link">
        <Link to={`/products/${row._id}`}>
          <h5>{row.brand}</h5>
          <p>{row.name}</p>
        </Link>
      </div>
    );
  };

  const PriceCell = (row) => {
    return <div>Rs. {row.price}</div>;
  };

  const QuantityCell = (row) => {
    return (
      <div className="qty-container">
        <div className="truck-icon">
          <FaTruck />
        </div>
        <div className="input-container">
          <div className="input-icon">Qty</div>
          <input
            className="qty-input"
            type="number"
            name="quantity"
            id="quantity"
            value={row.quantity}
            onChange={(e) => e.target.value}
          />
        </div>
      </div>
    );
  };

  const ImageCell = (row) => {
    return (
      <div className="row-side-img">
        <img src={row.image} alt={row.brand} />
      </div>
    );
  };

  const ActionCell = (row) => {
    return (
      <Button
        title="add"
        showIcon={true}
        icon={<BsFillCartPlusFill />}
        customStyles={{ backgroundColor: "#f3c547", color: "black" }}
      ></Button>
    );
  };

  return (
    <Wrapper className="">
      <CustomTable headerCoulumns={columns} rowsData={data} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .row-side-img {
    width: 50px;
    height: 50px;
  }
  .row-side-img img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .name-link a {
    color: var(--clr-black);
  }
  .qty-container {
    display: flex;
    align-items: center;
    gap: 1rem;

    .input-container {
      display: flex;
      align-items: center;
      border: 1px solid var(--clr-black);
      border-radius: 5px;
      padding: 10px;
      background: var(--clr-white);
    }

    .truck-icon {
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--clr-green-dark);
    }

    .input-container .input-icon {
      background: var(--clr-black30);
    }

    .input-container .qty-input {
      padding-left: 10px;
      font-size: 16px;
      border: none;
      outline: none;
    }
    .input-container .qty-input:focus {
      border: none;
    }
  }
`;

export default ProductsList;
