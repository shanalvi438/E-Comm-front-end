<Table
  border={1}
  responsive
  className="table-striped table-compar table-bordered tabl"
>
  <thead>
    <tr className="th-compare">
      <th className="product-name">Product Name</th>
      <td className="item-row">{product.name}</td>
    </tr>
  </thead>
  <tbody id="table-compare">
    <tr>
      <th className="product-name">Model</th>
      <td className="item-row">
        <p>{product.model_no}</p>
      </td>
    </tr>
    <tr>
      <th className="product-name">Availability</th>
      <td className="item-row">
        <p>Available In stock</p>
      </td>
    </tr>
    <tr>
      <th className="product-name">Minimum Orders</th>
      <td className="item-row">
        <p>{product.min_order}</p>
      </td>
    </tr>
    <tr>
      <th className="product-name">Warranty days</th>
      <td className="item-row">
        <div className="product-price product_price">
          <strong>On Sale: </strong>
          <span>{product.new_warranty_days}</span>
        </div>
      </td>
    </tr>
    <tr>
      <th className="product-name">Return Days</th>
      <td className="item-row">
        <p>{product.new_return_days}</p>
      </td>
    </tr>
    <tr>
      <th className="product-name">
        <h4 style={{ color: "gray" }}>Dimensions</h4>
      </th>
    </tr>
    <tr>
      <th className="product-name">Weight</th>
      <td className="item-row">
        <p>
          {product.weight} {product.weight_unit}
        </p>
      </td>
    </tr>
    <tr>
      <th className="product-name">Height</th>
      <td className="item-row">
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
    <tr>
      <th className="product-name">Brand</th>
      <td className="item-row">
        {product.brand ? (
          <Image src={`/${product.brand.logo}`} width={80} height={50} />
        ) : (
          <p>N/A</p>
        )}
      </td>
    </tr>
    <tr>
      <th className="product-name">Color</th>
      <td className="item-row">
        <p>{product.color.length > 0 ? product.color.join(", ") : "N/A"}</p>
      </td>
    </tr>
  </tbody>
</Table>;
