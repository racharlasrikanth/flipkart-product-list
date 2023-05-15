import React from "react";
import CustomTable from "./../components/CustomTable";
import Button from "../components/Button";
import { BsFillCartPlusFill } from "react-icons/bs";

function ProductsList({ data }) {
  const columns = [
    {
      id: "image",
      heading: "Image",
      customCellStyles: { minWidth: "70px" },
    },
    {
      id: "name",
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
    },
    {
      id: "quantity",
      heading: "Quantity",
      customCellStyles: { minWidth: "170px" },
    },
    {
      id: "action",
      heading: "Action",
      customCellStyles: { minWidth: "170px" },
      renderCell: (row) => Cell(row),
    },
  ];

  const NameCell = (row) => {
    return (
      <div>
        <h5>{row.name}</h5>
        <p>{row.desc}</p>
      </div>
    );
  };

  const Cell = (row) => {
    console.log("row", row);
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
    <div>
      <CustomTable headerCoulumns={columns} data={data} />
    </div>
  );
}

export default ProductsList;
