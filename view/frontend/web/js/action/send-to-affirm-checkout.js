/**
 * Copyright © 2015 Fastgento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*jshint jquery:true*/
define([
    "jquery",
    "mage/translate",
    "Astound_Affirm/js/affirm",
    "Magento_Checkout/js/model/full-screen-loader",
    "Magento_Checkout/js/model/quote",
    "mage/url",
    'Magento_Customer/js/model/customer',
    "Astound_Affirm/js/model/affirm"
], function ($, $t, loadScript, fullScreenLoader, quote, url, customer, affirmCheckout) {

    return function(response) {
        fullScreenLoader.startLoader();
        var result = JSON.parse(response), giftWrapItems = result.wrapped_items, checkoutObj;

        affirmCheckout.prepareOrderData(result);
        if (giftWrapItems !== 'undefined') {
            affirmCheckout.addItems(giftWrapItems);
        }
        affirm.ui.error.on("close", function() {
            //redirect to checkout cart in case if customer canceled or returned from error pop-up
            $.mage.redirect(window.checkoutConfig.payment['affirm_gateway'].merchant.user_cancel_url);
        });
        checkoutObj = affirmCheckout.getData();
        affirm.checkout(checkoutObj);
        affirm.checkout.post();
    }
});