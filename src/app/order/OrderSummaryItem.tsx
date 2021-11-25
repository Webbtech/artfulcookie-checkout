import classNames from 'classnames';
import { isNumber } from 'lodash';
import React, { memo, FunctionComponent, ReactNode } from 'react';

import { ShopperCurrency } from '../currency';

export interface OrderSummaryItemProps {
    id: string | number;
    amount: number;
    quantity: number;
    name: string;
    amountAfterDiscount?: number;
    image?: ReactNode;
    description?: ReactNode;
    productOptions?: OrderSummaryItemOption[];
}

export interface OrderSummaryItemOption {
    testId: string;
    content: ReactNode;
    optionValue?: string;
}

type FilteredOptions = OrderSummaryItemOption[];

const OrderSummaryItem: FunctionComponent<OrderSummaryItemProps> = ({
    amount,
    amountAfterDiscount,
    image,
    name,
    productOptions,
    quantity,
    description,
}) => (
    <div className="product" data-test="cart-item">
        <figure className="product-column product-figure">
            { image }
        </figure>

        <div className="product-column product-body">
            <h5
                className="product-title optimizedCheckout-contentPrimary"
                data-test="cart-item-product-title"
            >
                { `${quantity} x ${name}` }
            </h5>
            <ul
                className="product-options optimizedCheckout-contentSecondary"
                data-test="cart-item-product-options"
            >
                { /* myfix - replaced next line to include filter function */ }
                { /* { (productOptions || []).map((option, index) => */ }
                { filterNoOptions(productOptions || []).map((option, index) =>
                    <li
                        className="product-option"
                        data-test={ option.testId }
                        key={ index }
                    >
                        { option.content }
                    </li>
                ) }
            </ul>
            { description && <div
                className="product-description optimizedCheckout-contentSecondary"
                data-test="cart-item-product-description"
            >
                { description }
            </div> }
        </div>

        <div className="product-column product-actions">
            <div
                className={ classNames(
                    'product-price',
                    'optimizedCheckout-contentPrimary',
                    { 'product-price--beforeDiscount': isNumber(amountAfterDiscount) && amountAfterDiscount !== amount }
                ) }
                data-test="cart-item-product-price"
            >
                <ShopperCurrency amount={ amount } />
            </div>

            { isNumber(amountAfterDiscount) && amountAfterDiscount !== amount && <div
                className="product-price"
                data-test="cart-item-product-price--afterDiscount"
            >
                <ShopperCurrency amount={ amountAfterDiscount } />
            </div> }
        </div>
    </div>
);

// myfix: added this function to filter options with a value of 'No'
function filterNoOptions(productOptions: OrderSummaryItemOption[] | []): FilteredOptions {
    return (productOptions || []).filter(({ optionValue }) => optionValue !== 'No');
}

export default memo(OrderSummaryItem);
