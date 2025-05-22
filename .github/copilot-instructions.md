# GitHub Copilot Instructions for WordPress Development

## General Guidelines

1. Follow WordPress coding standards as defined in the `phpcs.xml` file in the repository.
2. Use PHP for backend development and ensure compatibility with the latest WordPress version.
3. Use JavaScript (preferably ES6+) for frontend interactions, and follow the ESLint rules defined in `.eslintrc`.
4. Avoid hardcoding URLs or paths; use WordPress functions like `get_template_directory_uri()` or `home_url()`.

## File Structure

- Place custom themes in the `web/wp-content/themes/` directory.
- Place custom plugins in the `web/wp-content/plugins/` directory.
- Use the `web/wp-content/uploads/` directory for media uploads.

## Theme Development

1. Create a `functions.php` file for theme-specific functionality.
2. Use `style.css` for theme metadata and styling.
3. Enqueue styles and scripts using `wp_enqueue_style()` and `wp_enqueue_script()` in `functions.php`.
4. Use template hierarchy for creating custom templates (e.g., `single.php`, `page-{slug}.php`).
5. Follow SCSS stylistic rules defined in `.stylelintrc.json` for styling.

## Plugin Development

1. Create a main plugin file with a header comment for metadata.
2. Use hooks (`add_action`, `add_filter`) to integrate functionality.
3. Avoid directly modifying core WordPress files.
4. Use nonces for form security and sanitize user inputs.

## Database Interaction

1. Use `$wpdb` for database queries.
2. Always prepare SQL statements to prevent SQL injection.
3. Use WordPress functions like `get_option()` and `update_option()` for storing settings.

## Testing and Debugging

1. Enable `WP_DEBUG` in `wp-config.php` for development environments.
2. Use tools like Query Monitor for debugging.
3. Write unit tests using the WordPress PHPUnit framework.

## Deployment

1. Use version control (e.g., Git) for managing code changes.
2. Avoid committing sensitive information like database credentials.
3. Use staging environments for testing before deploying to production.

## Additional Notes

- Follow accessibility guidelines (WCAG) for frontend development.
- Optimize images and assets for performance.
- Regularly update WordPress core, themes, and plugins to ensure security.
