import $ from 'jquery';
import prestashop from 'prestashop';

function productComparisonManage(productId, operation, onSuccess) {

    let action = (operation === 'add') ? 'addItemToComparison' : 'removeComparisonItem';
    
    $.ajax({
        url: prestashop.urls.base_url + `?controller=product-compare&ajax=1&action=${action}&compare_product_id=${productId}`,
        async: true,
        cache: false,
        dataType: 'json',
        success: function(data) {
            onSuccess(data);
        },
        error: function(){}
    });
}

function refreshComparisonPage( data ) {

    const result = parseInt(data.result);
    if(result) {
        $.ajax({
            url: prestashop.urls.base_url + `?controller=product-compare&ajax=1&action=refreshComparisonPage`,
            async: true,
            cache: false,
            success: function(data) {
                $('#productCompareContent').html(data);
            },
            error: function(){}
        });
    }
}

function clearComparison(onSuccess) {
    $.ajax({
        url: prestashop.urls.base_url + `?controller=product-compare&ajax=1&action=clearComparison`,
        async: true,
        cache: false,
        dataType: 'json',
        success: function(data) {
            onSuccess(data);
        },
        error: function(){}
    });
}

$(document).ready(function () {

    let compareItemsNumber = parseInt( $( '#compareItems' ).text() );

    const comparisonProductsLimit = (typeof productsComparisonLimit !== 'undefined') ? productsComparisonLimit : 2;


    $( 'body' ).on( 'click', '.compareShowResult', (e) => {
        if(compareItemsNumber < 2) {
            e.preventDefault();
        }
    });

    $( 'body' ).on( 'click', '.addProductToCompare', (e) => {
        e.preventDefault();

        let compareAction = 'add';
        let changeCompareState = false;

        if($( e.currentTarget ).hasClass('activeCompare')) {
            compareAction = 'remove'; 
            if( compareItemsNumber > 0) {
               changeCompareState = true;
            }
        }
        else {
            if(compareItemsNumber < comparisonProductsLimit) {
                changeCompareState = true;
            }
        }

        if( changeCompareState ) {
            const productID = parseInt( $( e.currentTarget ).data( 'id-product' ) );
            productComparisonManage( productID, compareAction, ( data ) => { 
                const result = parseInt(data.result);
                if(result) {
                    compareItemsNumber = parseInt(data.productsNumber);
                    $('#compareItems').text(compareItemsNumber);
                    $( e.currentTarget ).toggleClass('activeCompare');
                }
             } );
        }
    });


    $( '#productCompareContent' ).on( 'click', '.deleteProductFromComparison', (e) => {
        e.preventDefault();

        const productID = parseInt( $( e.currentTarget ).data( 'id-product' ) )
        productComparisonManage(productID, 'remove', ( data )=> { refreshComparisonPage( data ) } );
 
    });

    $( '#productCompareContent' ).on( 'click', '#clearProductComparison', (e) => {
        e.preventDefault();

        clearComparison(( data )=> { refreshComparisonPage( data ) });

    });

    $( '#productCompareContent' ).on( 'click', '#showProductDifference', (e) => {
        e.preventDefault();

        const isShowDifference = parseInt( $( e.currentTarget ).data( 'show' ) );

        if( isShowDifference ) {
            $('#productCompareTable tr[data-difference="1"]').addClass('differentValues');
            $( e.currentTarget ).text( $( e.currentTarget ).data( 'hidetext' ) );
        }
        else {
            $('#productCompareTable tr[data-difference="1"]').removeClass('differentValues');
            $( e.currentTarget ).text( $( e.currentTarget ).data( 'showtext' ) );
        }
          
        $( e.currentTarget ).data('show' , isShowDifference ? 0 : 1 );
    });

});
