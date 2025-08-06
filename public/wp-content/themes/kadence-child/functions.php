<?php

/**
 * Enqueue child styles.
 */
function child_enqueue_styles() {
	wp_enqueue_style( 'mbdstudio', get_stylesheet_directory_uri() . '/style.css', [], 100 );
}

// Uncomment the line below to enable the child theme's style.css file to load on the front end of your site.
// add_action( 'wp_enqueue_scripts', 'child_enqueue_styles' ); // Remove the // from the beginning of this line if you want the child theme style.css file to load on the front end of your site.
