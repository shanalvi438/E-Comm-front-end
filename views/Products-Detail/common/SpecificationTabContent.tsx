import React, { useState } from "react";
import { Table } from "reactstrap";
import Image from "next/image";

const SpecificationTabContent = () => {
  // Assuming product data is available here or passed as props
  const product = {
    name: "Example Product",
    model_no: "Model 123",
    min_order: 1,
    new_warranty_days: 12,
    new_return_days: 30,
    weight: 1.5,
    weight_unit: "kg",
    height: 10,
    m_unit: "cm",
    width: 20,
    depth: 15,
    stock: "available",
    brand: {
      logo: "path/to/logo.png",
    },
    color: ["Red", "Blue", "Green"],
  };

  const thStyle = {
    backgroundColor: '#f8f9fa',
    color :'black',
    fontWeight: 'bold',
   
  };
  
  // Initialize logo state based on existence of logo path
  const [logo, setLogo] = useState(product.brand && product.brand.logo ? product.brand.logo : null);

  return (
    <Table
      border={1}
      responsive
      className="table-striped table-compare table-bordered tabl"
    >
      <thead style={thStyle}>
        <th className="product-name" >Descriptions</th>
        <th ></th>
        <tr>
          <th>Product name</th>
          <td className="item-row">{product.name}</td>
        </tr>
        <tr>
          <th>Product Modal</th>
          <td className="item-row">
            <p>{product.model_no}</p>
          </td>
        </tr>
      </thead>

      <thead style={thStyle}>
        <th className="product-name" >Availability</th>
        <th></th>
        <tr>
          <th>Stock</th>
          <td>{product.stock === "available" ? "In Stock" : "Out of Stock"}</td>
        </tr>
        <tr>
          <th className="product-name">Minimum Orders</th>
          <td className="item-row">
            <p>{product.min_order}</p>
          </td>
        </tr>
      </thead>
      <thead style={thStyle}>
        <th> Warranty and returns </th>
        <th></th>
        <tr>
          <th>Warranty</th>

          <td>
            <span>{product.new_warranty_days}</span>
          </td>
        </tr>
        <tr>
          <th>Returns</th>
          <td>
            <p>{product.new_return_days}</p>
          </td>
        </tr>
      </thead>
      <thead style={thStyle}>
        {" "}
        Dimensions and Weight
        <th></th>
        <tr>
          <th>Weight</th>
          <td className="item-row">
            <p>
              {product.weight} {product.weight_unit}
            </p>
          </td>
        </tr>
        <tr>
          <th>Height</th>
          <td>
            <p>
              {product.height} {product.m_unit}
            </p>
          </td>
        </tr>
        <tr>
          <th className="product-name">Width</th>
          <td className="item-row">
            <p>
              {product.width} {product.m_unit}
            </p>
          </td>
        </tr>
        <tr>
          <th className="product-name">Depth</th>
          <td className="item-row">
            <p>
              {product.depth} {product.m_unit}
            </p>
          </td>
        </tr>
      </thead>

      <thead style={thStyle}>
        <th> Brand </th>
        <th></th>

        <tr>
          <th>Manufacturer Name</th>
          <td>{product.name}</td>
        </tr>
        <tr>
          <th>Logo</th>
          <td className="item-row">
            {logo ? (
              <Image src={`/${logo}`} width={80} height={20} />
            ) : (
              <p>N/A</p>
            )}
          </td>
        </tr>
      </thead>
      <thead style={thStyle}>
        <th>Color</th>
        <th></th>
        <tr>
          <th>Color</th>
          <td className="item-row">
            <p>{product.color.length > 0 ? product.color.join(", ") : "N/A"}</p>
          </td>
        </tr>
      </thead>

     
    </Table>
  );
};

export default SpecificationTabContent;
