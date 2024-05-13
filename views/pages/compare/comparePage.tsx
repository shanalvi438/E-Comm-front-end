import React from "react";
import { NextPage } from "next";
import { Row, Col, Media, Input, Button, Table } from "reactstrap";
import { CompareContext } from "../../../helpers/compare/compare.context";
import { CartContext } from "helpers/cart/cart.context";
import { useRouter } from "next/router";
import { Item } from "react-photoswipe-gallery";
const Compare: NextPage = () => {
  const { compareItems, removeFromComapre } = React.useContext(CompareContext);
  const { addToCart } = React.useContext(CartContext);
  const router = useRouter();
  const thstyle = { backgroundColor: "dee2e6" };

  return (
    <>
      <section className="compare-padding section-big-py-space">
        <div className="custom-container">
          <Row>
            <Col sm="12">
              {compareItems && compareItems.length > 0 ? (
                <div className="compare-page">
                  <div className="table-wrapper table-responsive">
                    <Table table-responsive>
                      <thead style={thstyle}>
                        <tr className="th-compare">
                          <td></td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <Button
                                type="button"
                                className="remove-compare"
                                onClick={() => removeFromComapre(item)}
                              >
                                Remove
                              </Button>
                            </td>
                          ))}
                        </tr>
                      </thead>
                      <tbody id="table-compare">
                        <tr>
                          <td></td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              {item.name}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td></td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <Media
                                src={item.url}
                                alt="product"
                                className="featured-image"
                              />
                              <div className="product-price product_price">
                                <strong>On Sale: </strong>
                                <span>{item.new_sale_price}</span>
                              </div>
                              <form className="variants clearfix">
                                <Input type="hidden" />
                                <Button
                                  title="Add to Cart"
                                  className="add-to-cart btn btn-normal"
                                  onClick={() => {
                                    addToCart(item);
                                  }}
                                >
                                  Add to Cart
                                </Button>
                              </form>
                              <p className="grid-link__title hidden">
                                {item.name}
                              </p>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="th-compare">
                          <th  colSpan={compareItems.length}>
                            Descrption
                          </th>
                          <th></th>
                        </tr>

                        <tr>
                          <td>Product Name</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              {item.name}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="th-compare">
                          <th colSpan={compareItems.length}>Avability</th>
                          <th></th>
                        </tr>

                        <tr>
                          <td>Stock</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              Available In stock
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>MOQ</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              {item.min_order}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="th-compare">
                          <th colSpan={compareItems.length}>
                            Waranty & Returns
                          </th>
                          <th></th>
                        </tr>

                        <tr>
                          <td>Waranty Days</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>{item.new_warranty_days}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Return Days</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>{item.new_return_days}</p>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="th-compare">
                          <th colSpan={compareItems.length}>
                            Dimensions & Weight
                          </th>

                          <th></th>
                        </tr>

                        <tr>
                          <td> width</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>
                                {item.width} {item.m_unit}
                              </p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Height</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>
                                {item.height} {item.m_unit}
                              </p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Depth</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>
                                {item.depth} {item.m_unit}
                              </p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Weight</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>
                                {item.weight} {item.weight_unit}
                              </p>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                      <tbody>
                        <tr className="th-compare">
                          <th colSpan={compareItems.length}>Brand</th>

                          <th></th>
                        </tr>
                        <tr>
                          <td>Manufecture Name</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>{item.brand?.brand_name}</p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td>Manufecture Name</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>N/A</p>
                            </td>
                          ))}
                        </tr>
                      </tbody>

                      <tbody>
                        <tr className="th-compare">
                          <th colSpan={compareItems.length}>Color</th>

                          <th></th>
                        </tr>
                        <tr>
                          <td>Color</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>N/A</p>
                            </td>
                          ))}
                        </tr>
                      </tbody>

                      <tbody>
                        <tr className="th-comapre">
                          <th colSpan={compareItems.length}>Size</th>

                          <th colSpan={compareItems.length}></th>
                        </tr>
                        <tr>
                          <td>Color</td>
                          {compareItems.map((item, i) => (
                            <td className="item-row" key={i}>
                              <p>N/A</p>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="col-sm-12">
                  <div>
                    <div className="col-sm-12 empty-cart-cls text-center">
                      <img
                        src={`static/images/icon-empty-cart.png`}
                        className="img-fluid mb-4"
                        alt=""
                      />
                      <img
                        src="/static/images/icon-empty-cart.png"
                        className="img-fluid mb-4"
                        alt=""
                      />

                      <h3>
                        <strong>Your Cart is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Compare;
