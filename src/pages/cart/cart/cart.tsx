import React, {useCallback, useState} from 'react';
import "./cart.css"
import {useDispatch, useSelector} from "react-redux";
import {IProduct} from "../../../data/data";
import changeTitle from "../../../middleware/changeTitle";
import {ScrollTop} from "../../../middleware/scrollTop";
import PageTitle from "../../../components/productPageTitle/productPageTitle";
import {addToCart, deleteProductFromCart} from "../../../action/productOnCart";
import {Link} from "react-router-dom";
import {totalPriceBuilder} from "../../../reducer/product";

function Cart() {

    changeTitle("Cart")
    ScrollTop()

    const dispatch = useDispatch()
    const numberFormatter = new Intl.NumberFormat(undefined,{
        style: 'currency',
        currency: 'USD'
    })

    const [isBuy, setIsBuy] = useState(false)
    // @ts-ignore
    const productData = useSelector(state => state.product)

    function deleteProduct(id: number) {
        // @ts-ignore
        let deleteProductOnCart = prompt("Are you sure you want to delete?", "yes")
        if (deleteProductOnCart === "yes") { // @ts-ignore
            dispatch(deleteProductFromCart({id}))
        } else if (deleteProductOnCart !== null) {
            // @ts-ignore
            dispatch(deleteProductFromCart({id}))
        }
    }

    // @ts-ignore
    const handleAdd = useCallback((productItem: IProduct) => {
        dispatch(addToCart(productItem))
    }, [])

    // @ts-ignore
    const handleDelete = useCallback((product: IProduct) => {
        dispatch(deleteProductFromCart(product.id))
    }, [])

    return (
        <div style={{marginTop: 90}} className="cart">
            <PageTitle title="Cart" locationTitle="cart" locationTitle2=""/>
            <div style={{marginTop: 50}} className="container">
                {Object.keys(productData).length === 0 ? (
                    <div className="empty-basket">
                        <i className="fa-regular fa-cart-shopping"></i>
                        <span>Your basket is empty</span>
                        <Link to="/women-product" className="btn-primary">Buy our
                            products</Link>
                    </div>
                ) : (
                    <>
                        <h3>{productData.length} selected products</h3>
                        <div className="cart-items">
                            <div className="selected-products">
                                {productData.map((product: IProduct, index: number) => (
                                    <div className="selected-product" key={product.id}>
                                        <div className="selected-product-detail">
                                            <img src={product.image} alt={product.title}/>
                                            <div className="selected-product-info">
                                                <h2>{product.title}</h2>
                                                <span>color: <span>{product.color}</span></span>
                                                <span>size: <span>{product.size}</span></span>
                                                <span>price: ${product.price}</span>
                                                <div className="selected-product-rating">
                                                    <span
                                                        className="selected-product-rating-rate">{product.rating.rate}</span>
                                                    <div>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                        <i className="fa-solid fa-star"></i>
                                                    </div>
                                                    <span
                                                        className="selected-product-rating-count">({product.rating.count} estimates)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="selected-product-price-and-delete">
                                            <div className="quantity-add">
                                                <button onClick={() => {
                                                    setIsBuy(false)
                                                    handleDelete(product)
                                                }}>-
                                                </button>
                                                <span>{product?.quantity}</span>
                                                <button
                                                    onClick={() => {
                                                        setIsBuy(prev => !prev)
                                                        handleAdd(product)
                                                    }}>+
                                                </button>
                                            </div>
                                            <span>Price: {product.quantity && numberFormatter.format(product.price * product.quantity)}</span>
                                            <button className="btn-primary delete-btn"
                                                    onClick={() => deleteProduct(product.id)}>delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="checkout-order">
                                <h1>Total Price:  {numberFormatter.format(totalPriceBuilder(productData))}</h1>
                                <button className="btn-primary">Checkout Order</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;